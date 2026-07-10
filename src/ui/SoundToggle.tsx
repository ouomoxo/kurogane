import { useEffect, useState } from 'react'
import { armFromPreference, disableSound, enableSound, isSoundOn } from '../sound/engine'

// Ambient audio control. Muted by default; a stored preference only re-arms on
// the visitor's next gesture (autoplay policy). Three level bars animate while
// the facility bed is live.
export function SoundToggle() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (isSoundOn()) {
      setOn(true)
      return
    }
    if (!armFromPreference()) return
    const sync = () => setOn(isSoundOn())
    window.addEventListener('pointerdown', sync, { once: true })
    window.addEventListener('keydown', sync, { once: true })
    return () => {
      window.removeEventListener('pointerdown', sync)
      window.removeEventListener('keydown', sync)
    }
  }, [])

  const toggle = () => {
    if (on) {
      disableSound()
      setOn(false)
    } else {
      enableSound()
      setOn(true)
    }
  }

  return (
    <button
      className={`snd${on ? ' snd--on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'}
    >
      <span className="mono">SND</span>
      <span className="snd__bars" aria-hidden>
        <i /><i /><i />
      </span>
    </button>
  )
}
