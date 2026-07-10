import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, RoundedBox, Html, MeshReflectorMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { useHeroMats, type HeroMats } from './mats'

type Tier = 'high' | 'low'

/* THE CONTINUITY CORE — Data Temple staged as a machine-space (RESET, D-013).
   Not an object in a void: a sealed hall. Reflective composite floor, perimeter
   security columns, an etched glyph in the fog, and the inverted ziggurat of
   cognition strata at its center. Nothing floats and nothing idles: the system
   IGNITES once when access is granted (dais ring → signal → strata → perimeter,
   in sequence), and every motion after that is state-driven — scroll opens the
   archive and rotates the core; the camera has mass. */

const PLATES = [1.15, 1.65, 2.15, 2.65, 3.15]

/* Per-part emissive channels so ignition can sweep through the machine
   in order instead of everything pulsing in sync. */
function useStateMats() {
  return useMemo(() => {
    const mk = (target: number) => ({
      mat: new THREE.MeshStandardMaterial({ color: '#1a0202', emissive: new THREE.Color('#e10600'), emissiveIntensity: 0 }),
      target,
    })
    return { dais: mk(2.2), signal: mk(2.4), strata: mk(2.0), perimeter: mk(1.1) }
  }, [])
}

/* ramp with a brief ignition overshoot — a seam catching, not a fade-in */
function ignite(elapsed: number, delay: number, target: number): number {
  const t = elapsed - delay
  if (t <= 0) return 0
  const p = Math.min(t / 0.55, 1)
  const overshoot = t < 0.75 ? Math.max(0, Math.sin((t / 0.75) * Math.PI)) * 0.5 : 0
  return p * target + overshoot
}

function Temple({
  mats,
  scrollY,
  reducedMotion,
  compact,
  igniteAt,
}: {
  mats: HeroMats
  scrollY: React.MutableRefObject<number>
  reducedMotion: boolean
  compact: boolean
  igniteAt: React.MutableRefObject<number | null>
}) {
  const sm = useStateMats()
  const rig = useRef<THREE.Group>(null!)
  const plateRefs = useRef<(THREE.Group | null)[]>([])
  const keystone = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const open = reducedMotion ? 0.3 : 0.1 + scrollY.current * 0.95
    const gap = 0.46 + open * 0.52
    PLATES.forEach((_, i) => {
      const g = plateRefs.current[i]
      if (g) g.position.y = i * gap
    })
    if (keystone.current) keystone.current.position.y = PLATES.length * gap + 0.32
    // rotation is scroll-linked — deliberate, not ambient
    rig.current.rotation.y = 0.18 + (reducedMotion ? 0 : scrollY.current * 0.55)

    // ignition state machine
    if (reducedMotion) {
      sm.dais.mat.emissiveIntensity = sm.dais.target
      sm.signal.mat.emissiveIntensity = sm.signal.target
      sm.strata.mat.emissiveIntensity = sm.strata.target
      sm.perimeter.mat.emissiveIntensity = sm.perimeter.target
      return
    }
    const t0 = igniteAt.current
    const e = t0 == null ? -1 : clock.elapsedTime - t0
    sm.dais.mat.emissiveIntensity = e < 0 ? 0 : ignite(e, 0.0, sm.dais.target)
    sm.signal.mat.emissiveIntensity = e < 0 ? 0 : ignite(e, 0.45, sm.signal.target)
    sm.strata.mat.emissiveIntensity = e < 0 ? 0 : ignite(e, 0.95, sm.strata.target + open * 1.2)
    sm.perimeter.mat.emissiveIntensity = e < 0 ? 0 : ignite(e, 1.6, sm.perimeter.target)
  })

  return (
    <group position={[compact ? 0 : 2.3, 0, 0]} scale={compact ? 0.78 : 0.9}>
      <group ref={rig} position={[0, 0.85, 0]}>
        {PLATES.map((w, i) => (
          <group key={i} ref={(el) => (plateRefs.current[i] = el)}>
            <RoundedBox args={[w, 0.3, w]} radius={0.05} smoothness={3} material={i % 2 ? mats.obsidian : mats.lacquer} />
            <mesh material={mats.gunmetal} position={[0, -0.06, w / 2 + 0.005]}>
              <boxGeometry args={[w * 0.62, 0.045, 0.012]} />
            </mesh>
            <mesh material={mats.gunmetal} position={[w / 2 + 0.005, -0.06, 0]}>
              <boxGeometry args={[0.012, 0.045, w * 0.62]} />
            </mesh>
            {i % 2 === 0 && (
              <mesh material={sm.strata.mat} position={[w / 2 - 0.12, 0.02, w / 2 + 0.006]}>
                <boxGeometry args={[0.09, 0.03, 0.01]} />
              </mesh>
            )}
            {i < PLATES.length - 1 && (
              <>
                <mesh material={mats.glass} position={[0, 0.23, 0]}>
                  <boxGeometry args={[w * 0.82, 0.16, w * 0.82]} />
                </mesh>
                <mesh material={sm.strata.mat} position={[0, 0.23, 0]}>
                  <boxGeometry args={[w * 0.55, 0.05, w * 0.55]} />
                </mesh>
              </>
            )}
          </group>
        ))}
        <mesh ref={keystone} material={mats.gunmetal} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.5, 0.6, 4]} />
        </mesh>
        {!compact && !reducedMotion && (
          <Html position={[-2.35, 1.9, 0]} className="s-label mono" occlude={false} zIndexRange={[3, 3]}>
            Strata · Cognition Archive
          </Html>
        )}
      </group>

      {/* signal column */}
      <mesh material={sm.signal.mat} position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 3.0, 12]} />
      </mesh>

      {/* ceramic dais */}
      <group position={[0, -2.3, 0]}>
        <mesh material={mats.ceramic}>
          <cylinderGeometry args={[1.9, 2.2, 0.28, 64]} />
        </mesh>
        <mesh material={mats.gunmetal} position={[0, -0.24, 0]}>
          <cylinderGeometry args={[2.45, 2.6, 0.2, 64]} />
        </mesh>
        <mesh material={sm.dais.mat} position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.012, 8, 96]} />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2 + 0.4
          return (
            <mesh key={i} material={mats.steel} position={[Math.cos(a) * 1.72, 0.145, Math.sin(a) * 1.72]}>
              <boxGeometry args={[0.16, 0.015, 0.05]} />
            </mesh>
          )
        })}
        {!compact && !reducedMotion && (
          <Html position={[2.5, 0.25, 0]} className="s-label mono" occlude={false} zIndexRange={[3, 3]}>
            Signal · TYO-000
          </Html>
        )}
      </group>

      {/* ── The hall: perimeter security columns ── */}
      {[-2.6, -1.55, -0.5, 0.55, 1.6, 2.65].map((a, i) => {
        const r = 8.2
        return (
          <group key={i} position={[Math.sin(a) * r, 0.6, -3.5 - Math.cos(a) * (r * 0.55)]}>
            <RoundedBox args={[0.62, 7.2, 0.62]} radius={0.06} smoothness={2} material={mats.obsidian} />
            <mesh material={sm.perimeter.mat} position={[0, 0.4, 0.315]}>
              <boxGeometry args={[0.03, 5.6, 0.012]} />
            </mesh>
            <mesh material={mats.gunmetal} position={[0, -2.9, 0]}>
              <boxGeometry args={[0.86, 0.35, 0.86]} />
            </mesh>
          </group>
        )
      })}

      {/* etched glyph on the fog wall — the seal, barely there */}
      <group position={[compact ? 0 : -1.5, 1.6, -13]}>
        <mesh material={mats.steel} rotation={[0, 0, -0.42]} position={[-1.05, 0, 0]}>
          <boxGeometry args={[0.14, 5.2, 0.05]} />
        </mesh>
        <mesh material={mats.steel} rotation={[0, 0, 0.42]} position={[1.05, 0, 0]}>
          <boxGeometry args={[0.14, 5.2, 0.05]} />
        </mesh>
        <mesh material={sm.perimeter.mat} position={[0, -1.35, 0]}>
          <boxGeometry args={[1.7, 0.1, 0.05]} />
        </mesh>
      </group>
    </group>
  )
}

/* Reflective composite floor — reflections reveal form and make it a place.
   Tier-gated: low tier gets a satin plane + contact shadow instead. */
function Floor({ tier }: { tier: Tier }) {
  if (tier === 'high') {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.87, 0]}>
        <planeGeometry args={[70, 44]} />
        <MeshReflectorMaterial
          blur={[280, 70]}
          resolution={1024}
          mixBlur={0.9}
          mixStrength={0.55}
          roughness={0.55}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#08080a"
          metalness={0.55}
          mirror={0.55}
        />
      </mesh>
    )
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.87, 0]}>
      <planeGeometry args={[70, 44]} />
      <meshStandardMaterial color="#08080a" metalness={0.6} roughness={0.4} />
    </mesh>
  )
}

/* Camera with mass: scroll-driven push, faint pointer drift, no idle motion. */
function Dolly({ scrollY, compact }: { scrollY: React.MutableRefObject<number>; compact: boolean }) {
  const { camera, pointer } = useThree()
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.002, dt)
    const base = compact ? 14.6 : 12.6
    const tz = base - THREE.MathUtils.clamp(scrollY.current, 0, 1) * 3.1
    camera.position.z += (tz - camera.position.z) * k
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * k * 0.5
    camera.position.y += (0.7 + pointer.y * 0.3 - camera.position.y) * k * 0.5
    camera.lookAt(compact ? 0 : 1.15, 0.05, 0)
  })
  return null
}

export function HeroScene({
  tier,
  reducedMotion,
  scrollY,
  ignited,
}: {
  tier: Tier
  reducedMotion: boolean
  scrollY: React.MutableRefObject<number>
  ignited: boolean
}) {
  const compact = typeof window !== 'undefined' && window.innerWidth < 780
  const [live, setLive] = useState(false)
  const igniteAt = useRef<number | null>(null)
  return (
    <Canvas
      className={`hero__scene${live ? ' hero__scene--live' : ''}`}
      onCreated={() => requestAnimationFrame(() => requestAnimationFrame(() => setLive(true)))}
      shadows={tier === 'high'}
      dpr={[1, tier === 'high' ? 1.8 : 1.35]}
      gl={{ antialias: tier !== 'high', powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 34, near: 0.1, far: 90, position: [0, 0.7, compact ? 14.6 : 12.6] }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 13, 30]} />

      <ambientLight intensity={0.16} color="#20222a" />
      <spotLight
        position={[7, 12, 9]}
        angle={0.45}
        penumbra={1}
        intensity={tier === 'high' ? 480 : 340}
        color="#dfe4ee"
        distance={50}
        decay={1.4}
        castShadow={tier === 'high'}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
      />
      <spotLight position={[-9, 3, -5]} angle={0.6} penumbra={1} intensity={170} color="#e10600" distance={36} decay={1.6} />
      <pointLight position={[0, -1, 9]} intensity={45} color="#8a90a0" distance={24} decay={1.7} />

      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#cfd6e2" scale={[10, 14, 1]} position={[6, 6, 8]} />
        <Lightformer form="rect" intensity={1.1} color="#5a1010" scale={[8, 12, 1]} position={[-8, 2, -4]} />
        <Lightformer form="rect" intensity={0.7} color="#20242c" scale={[16, 16, 1]} position={[0, 10, -10]} />
      </Environment>

      <IgniteBridge ignited={ignited} igniteAt={igniteAt} />
      <TempleWithMats scrollY={scrollY} reducedMotion={reducedMotion} compact={compact} igniteAt={igniteAt} />
      <Floor tier={tier} />

      {tier === 'low' && (
        <ContactShadows position={[0, -2.82, 0]} opacity={0.72} scale={18} blur={2.4} far={7} resolution={512} color="#000000" />
      )}

      <Dolly scrollY={scrollY} compact={compact} />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        {[
          <Bloom
            key="b"
            intensity={tier === 'high' ? 0.62 : 0.48}
            luminanceThreshold={0.74}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.68}
          />,
          <ToneMapping key="t" mode={ToneMappingMode.ACES_FILMIC} />,
          <Vignette key="v" eskil={false} offset={0.3} darkness={0.82} />,
          ...(tier === 'high' ? [<SMAA key="s" />] : []),
        ]}
      </EffectComposer>
    </Canvas>
  )
}

/* Stamps the clock the moment access is granted so ignition delays are
   measured from the threshold, not from page load. */
function IgniteBridge({ ignited, igniteAt }: { ignited: boolean; igniteAt: React.MutableRefObject<number | null> }) {
  useFrame(({ clock }) => {
    if (ignited && igniteAt.current == null) igniteAt.current = clock.elapsedTime
  })
  return null
}

function TempleWithMats(props: {
  scrollY: React.MutableRefObject<number>
  reducedMotion: boolean
  compact: boolean
  igniteAt: React.MutableRefObject<number | null>
}) {
  const mats = useHeroMats()
  return <Temple mats={mats} {...props} />
}
