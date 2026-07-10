import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useHeroMats, type HeroMats } from './mats'
import { HallColumns, HallGlyph, HallFloor, HallLighting, HallPost } from './hall'

export type HeroDirection = 'a' | 'b' | 'c'

type Mats = HeroMats

/* P1 DIRECTION MATRIX — every direction staged INSIDE the machine-space hall
   (D-013): reflective floor, perimeter columns, glyph, one light rig, one post
   chain. Motion is state-driven only: the ignition sweep runs once on entry,
   `f` (the scroll fraction) opens the object and pushes the camera exactly as
   the production hero does. Nothing floats, nothing idles. */

const PLATES = [1.15, 1.65, 2.15, 2.65, 3.15]

/* Same per-part emissive channels + ignition sweep as the production hero:
   dais → signal → strata → perimeter. */
function useChannelMats() {
  return useMemo(() => {
    const mk = (target: number) => ({
      mat: new THREE.MeshStandardMaterial({ color: '#1a0202', emissive: new THREE.Color('#e10600'), emissiveIntensity: 0 }),
      target,
    })
    return { dais: mk(2.2), signal: mk(2.4), strata: mk(2.0), perimeter: mk(1.1) }
  }, [])
}
type ChannelMats = ReturnType<typeof useChannelMats>

function ignite(elapsed: number, delay: number, target: number): number {
  const t = elapsed - delay
  if (t <= 0) return 0
  const p = Math.min(t / 0.55, 1)
  const overshoot = t < 0.75 ? Math.max(0, Math.sin((t / 0.75) * Math.PI)) * 0.5 : 0
  return p * target + overshoot
}

/* Ignition begins on mount — the matrix judges the ignited machine and, in
   the transition frame, the sweep itself. */
function IgnitionDriver({ sm, open }: { sm: ChannelMats; open: number }) {
  const t0 = useRef<number | null>(null)
  useFrame(({ clock }) => {
    if (t0.current == null) t0.current = clock.elapsedTime
    const e = clock.elapsedTime - t0.current
    sm.dais.mat.emissiveIntensity = ignite(e, 0.0, sm.dais.target)
    sm.signal.mat.emissiveIntensity = ignite(e, 0.45, sm.signal.target)
    sm.strata.mat.emissiveIntensity = ignite(e, 0.95, sm.strata.target + open * 1.2)
    sm.perimeter.mat.emissiveIntensity = ignite(e, 1.6, sm.perimeter.target)
  })
  return null
}

/* A — CORPORATE RELIQUARY, hall-staged. The corporation's continuity as a
   ceremonial vessel: obsidian slat armor around a ceramic capsule, red
   memory-band, gunmetal crown, held (statically — the levitation is a fact,
   not an animation) over an engraved plinth. Scroll parts the armor. */
export function Reliquary({ mats, sm, open }: { mats: Mats; sm: ChannelMats; open: number }) {
  const SLATS = 9
  return (
    <group rotation={[0, 0.18 + open * 0.55, 0]}>
      {/* held vessel */}
      <group position={[0, 0.32, 0]}>
        <mesh material={mats.ceramic}>
          <capsuleGeometry args={[0.72, 1.7, 12, 32]} />
        </mesh>
        {/* red memory band recessed into the capsule — the signal made ring */}
        <mesh material={sm.signal.mat}>
          <torusGeometry args={[0.735, 0.028, 12, 96]} />
        </mesh>
        <mesh material={mats.glass}>
          <cylinderGeometry args={[0.95, 0.95, 2.5, 48, 1, true]} />
        </mesh>
        {/* obsidian slat armor — parts with scroll */}
        {Array.from({ length: SLATS }, (_, i) => {
          const a = (i / SLATS) * Math.PI * 2
          const r = 1.18 + open * 0.5
          return (
            <group key={i} rotation={[0, a, 0]}>
              <group position={[r, 0, 0]} rotation={[0, 0, -open * 0.25]}>
                <RoundedBox args={[0.3, 3.15, 0.16]} radius={0.045} smoothness={3} material={mats.lacquer} />
                <mesh material={sm.perimeter.mat} position={[0.02, -1.28, 0.085]}>
                  <boxGeometry args={[0.1, 0.05, 0.012]} />
                </mesh>
              </group>
            </group>
          )
        })}
        {/* gunmetal crown */}
        <mesh material={mats.gunmetal} position={[0, 1.78, 0]}>
          <cylinderGeometry args={[0.55, 0.85, 0.3, 48]} />
        </mesh>
        <mesh material={sm.strata.mat} position={[0, 1.95, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
        </mesh>
      </group>
      {/* engraved plinth */}
      <group position={[0, -2.35, 0]}>
        <mesh material={mats.gunmetal}>
          <cylinderGeometry args={[2.15, 2.45, 0.22, 64]} />
        </mesh>
        <mesh material={mats.steel} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[1.55, 1.9, 0.26, 64]} />
        </mesh>
        <mesh material={sm.dais.mat} position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.62, 0.012, 8, 128]} />
        </mesh>
      </group>
    </group>
  )
}

/* B — SOVEREIGN DEFENSE CORE, hall-staged. Reactor-grade hardware: eight
   chamfered armor petals around an octagonal red core, hex caps, sensor
   ring, heat fins. Scroll hinges the petals open. */
export function DefenseCore({ mats, sm, open }: { mats: Mats; sm: ChannelMats; open: number }) {
  const PETALS = 8
  return (
    <group position={[0, -0.15, 0]} rotation={[0, 0.18 + open * 0.55, 0]}>
      {/* internal core — octagonal, flat-shaded */}
      <mesh material={sm.signal.mat}>
        <cylinderGeometry args={[0.52, 0.52, 2.3, 8]} />
      </mesh>
      <mesh material={mats.glass}>
        <cylinderGeometry args={[0.78, 0.78, 2.32, 24, 1, true]} />
      </mesh>
      {/* armor petals, hinged open by scroll */}
      {Array.from({ length: PETALS }, (_, i) => {
        const a = (i / PETALS) * Math.PI * 2
        return (
          <group key={i} rotation={[0, a, 0]}>
            <group position={[1.12 + open * 0.42, 0, 0]} rotation={[0, 0, -0.1 - open * 0.34]}>
              <RoundedBox args={[0.24, 2.55, 0.62]} radius={0.05} smoothness={3} material={mats.obsidian} />
              <mesh material={mats.gunmetal} position={[0.13, 0.6, 0]}>
                <boxGeometry args={[0.02, 0.9, 0.5]} />
              </mesh>
              <mesh material={sm.perimeter.mat} position={[0.13, -0.95, 0]}>
                <boxGeometry args={[0.015, 0.18, 0.34]} />
              </mesh>
            </group>
          </group>
        )
      })}
      {/* heat fins */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        return (
          <group key={i} rotation={[0, a, 0]}>
            <mesh material={mats.steel} position={[0.95, 1.52, 0]}>
              <boxGeometry args={[0.5, 0.14, 0.05]} />
            </mesh>
          </group>
        )
      })}
      {/* hex caps */}
      <mesh material={mats.gunmetal} position={[0, 1.78, 0]}>
        <cylinderGeometry args={[1.05, 1.42, 0.5, 6]} />
      </mesh>
      <mesh material={mats.gunmetal} position={[0, -1.72, 0]}>
        <cylinderGeometry args={[1.5, 1.15, 0.5, 6]} />
      </mesh>
      {/* sensor ring — parked at a composed bearing, not spinning */}
      <group position={[0, 0.85, 0]} rotation={[0, 0.7, 0]}>
        <mesh material={mats.steel} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.78, 0.035, 10, 96]} />
        </mesh>
        <mesh material={sm.strata.mat} position={[1.78, 0, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
        </mesh>
      </group>
      {/* base platform */}
      <mesh material={mats.steel} position={[0, -2.28, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.24, 8]} />
      </mesh>
      <mesh material={sm.dais.mat} position={[0, -2.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.014, 8, 96]} />
      </mesh>
    </group>
  )
}

/* C — DATA TEMPLE, exactly as the production hero stages it: inverted
   ziggurat of cognition strata, signal column, ceramic dais. */
export function DataTemple({ mats, sm, open }: { mats: Mats; sm: ChannelMats; open: number }) {
  const gap = 0.46 + open * 0.52
  return (
    <group>
      <group position={[0, 0.85, 0]} rotation={[0, 0.18 + open * 0.55, 0]}>
        {PLATES.map((w, i) => (
          <group key={i} position={[0, i * gap, 0]}>
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
        <mesh material={mats.gunmetal} position={[0, PLATES.length * gap + 0.32, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.5, 0.6, 4]} />
        </mesh>
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
      </group>
    </group>
  )
}

/* Camera parked at the production dolly's position for scroll fraction `f`.
   No pointer drift — renders must be deterministic for the matrix. */
function MatrixCamera({ f, compact }: { f: number; compact: boolean }) {
  const { camera } = useThree()
  useFrame(() => {
    const base = compact ? 14.6 : 12.6
    camera.position.set(0, 0.7, base - THREE.MathUtils.clamp(f, 0, 1) * 3.1)
    camera.lookAt(compact ? 0 : 1.15, 0.05, 0)
  })
  return null
}

/* Shared cinematography — the production hall, verbatim. */
export default function ProtoScene({ variant, f, compact }: { variant: HeroDirection; f: number; compact: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 34, near: 0.1, far: 90, position: [0, 0.7, compact ? 14.6 : 12.6] }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 13, 30]} />
      <HallLighting tier="high" />
      <Inner variant={variant} f={f} compact={compact} />
      <HallFloor tier="high" />
      <MatrixCamera f={f} compact={compact} />
      <HallPost tier="high" />
    </Canvas>
  )
}

function Inner({ variant, f, compact }: { variant: HeroDirection; f: number; compact: boolean }) {
  const mats = useHeroMats()
  const sm = useChannelMats()
  const open = 0.1 + THREE.MathUtils.clamp(f, 0, 1) * 0.95
  return (
    <group position={[compact ? 0 : 2.3, 0, 0]} scale={compact ? 0.78 : 0.9}>
      <IgnitionDriver sm={sm} open={open} />
      {variant === 'a' && <Reliquary mats={mats} sm={sm} open={open} />}
      {variant === 'b' && <DefenseCore mats={mats} sm={sm} open={open} />}
      {variant === 'c' && <DataTemple mats={mats} sm={sm} open={open} />}
      <HallColumns mats={mats} seamMat={sm.perimeter.mat} />
      <HallGlyph mats={mats} seamMat={sm.perimeter.mat} x={compact ? 0 : -1.5} />
    </group>
  )
}
