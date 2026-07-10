// Procedural sound engine. Every tone is synthesized at runtime from
// oscillators and generated noise — no recorded assets, nothing sampled.
// Muted by default; only ever started from an explicit user gesture.

let ctx: AudioContext | null = null
let master: GainNode | null = null
let bedNodes: { stop: () => void } | null = null
let enabled = false

const BED_LEVEL = 0.05
const RAMP = 1.2

function ensureContext() {
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return { ctx, master: master! }
}

// Low ambient bed: two barely-detuned sines through a lowpass, breathing on a
// slow LFO, plus a whisper of generated air (filtered white noise). Reads as
// facility hum, sits far below speech level.
function startBed() {
  const { ctx: ac, master: out } = ensureContext()
  if (!ac || bedNodes) return
  const bed = ac.createGain()
  bed.gain.value = BED_LEVEL
  const lp = ac.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 220
  lp.connect(bed)
  bed.connect(out)

  const oscA = ac.createOscillator()
  oscA.frequency.value = 54
  const oscB = ac.createOscillator()
  oscB.frequency.value = 54.4
  const oscGain = ac.createGain()
  oscGain.gain.value = 0.5
  oscA.connect(oscGain)
  oscB.connect(oscGain)
  oscGain.connect(lp)

  const lfo = ac.createOscillator()
  lfo.frequency.value = 0.06
  const lfoDepth = ac.createGain()
  lfoDepth.gain.value = BED_LEVEL * 0.4
  lfo.connect(lfoDepth)
  lfoDepth.connect(bed.gain)

  const noiseBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate)
  const data = noiseBuf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const noise = ac.createBufferSource()
  noise.buffer = noiseBuf
  noise.loop = true
  const air = ac.createBiquadFilter()
  air.type = 'bandpass'
  air.frequency.value = 900
  air.Q.value = 0.6
  const airGain = ac.createGain()
  airGain.gain.value = 0.012
  noise.connect(air)
  air.connect(airGain)
  airGain.connect(out)

  oscA.start()
  oscB.start()
  lfo.start()
  noise.start()
  bedNodes = {
    stop() {
      for (const n of [oscA, oscB, lfo, noise]) {
        try { n.stop() } catch { /* already stopped */ }
      }
      bed.disconnect()
      airGain.disconnect()
    },
  }
}

// Short interface tick for interactive elements: one high sine pinged through
// a tight bandpass, ~40 ms. Quiet enough to register as texture, not alert.
export function tick(freq = 1680) {
  if (!enabled || !ctx || !master) return
  const ac = ctx
  const t = ac.currentTime
  const osc = ac.createOscillator()
  osc.frequency.value = freq
  const bp = ac.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = freq
  bp.Q.value = 9
  const g = ac.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
  osc.connect(bp)
  bp.connect(g)
  g.connect(master)
  osc.start(t)
  osc.stop(t + 0.07)
}

function onDelegatedClick(e: MouseEvent) {
  const el = (e.target as HTMLElement | null)?.closest?.('a, button')
  if (el) tick(el.tagName === 'A' ? 1680 : 1240)
}

export function isSoundOn() {
  return enabled
}

export function enableSound() {
  if (enabled) return
  enabled = true
  const { ctx: ac, master: out } = ensureContext()
  startBed()
  out.gain.cancelScheduledValues(ac.currentTime)
  out.gain.setTargetAtTime(1, ac.currentTime, RAMP / 3)
  document.addEventListener('click', onDelegatedClick, true)
  try { localStorage.setItem('krg-sound', '1') } catch { /* private mode */ }
}

export function disableSound() {
  if (!enabled) return
  enabled = false
  document.removeEventListener('click', onDelegatedClick, true)
  if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.15)
    const ac = ctx
    window.setTimeout(() => {
      if (!enabled) void ac.suspend()
    }, 800)
  }
  try { localStorage.setItem('krg-sound', '0') } catch { /* private mode */ }
}

// Sound preference persists, but browsers block audio before a gesture — so a
// returning visitor's preference re-arms on their first interaction instead of
// auto-playing on load.
export function armFromPreference() {
  let pref: string | null = null
  try { pref = localStorage.getItem('krg-sound') } catch { /* private mode */ }
  if (pref !== '1') return false
  const resume = () => enableSound()
  window.addEventListener('pointerdown', resume, { once: true })
  window.addEventListener('keydown', resume, { once: true })
  return true
}
