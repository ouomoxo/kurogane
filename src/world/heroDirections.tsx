import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, RoundedBox } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { useHeroMats, type HeroMats } from './mats'

export type HeroDirection = 'a' | 'b' | 'c'

type Mats = HeroMats

/* A — CORPORATE RELIQUARY. The corporation's continuity held as a ceremonial
   vessel: obsidian slat armor around a ceramic capsule, red memory-band,
   gunmetal crown, levitating over an engraved plinth. */
export function Reliquary({ mats, open = 0 }: { mats: Mats; open?: number }) {
  const g = useRef<THREE.Group>(null!)
  const band = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    g.current.position.y = 0.32 + Math.sin(t * 0.55) * 0.05
    g.current.rotation.y = t * 0.08
    mats.core.emissiveIntensity = 2.0 + Math.sin(t * 1.1) * 0.5
    if (band.current) band.current.rotation.y = -t * 0.14
  })
  const SLATS = 9
  return (
    <group>
      {/* levitating vessel */}
      <group ref={g}>
        {/* ceramic capsule */}
        <mesh material={mats.ceramic}>
          <capsuleGeometry args={[0.72, 1.7, 12, 32]} />
        </mesh>
        {/* red memory band recessed into the capsule */}
        <mesh ref={band} material={mats.core}>
          <torusGeometry args={[0.735, 0.028, 12, 96]} />
        </mesh>
        {/* glass sleeve */}
        <mesh material={mats.glass}>
          <cylinderGeometry args={[0.95, 0.95, 2.5, 48, 1, true]} />
        </mesh>
        {/* obsidian slat armor — opens with scroll */}
        {Array.from({ length: SLATS }, (_, i) => {
          const a = (i / SLATS) * Math.PI * 2
          const r = 1.18 + open * 0.5
          return (
            <group key={i} rotation={[0, a, 0]}>
              <group position={[r, 0, 0]} rotation={[0, 0, -open * 0.25]}>
                <RoundedBox args={[0.3, 3.15, 0.16]} radius={0.045} smoothness={3} material={mats.lacquer} />
                <mesh material={mats.ember} position={[0.02, -1.28, 0.085]}>
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
        <mesh material={mats.core} position={[0, 1.95, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
        </mesh>
      </group>
      {/* plinth */}
      <group position={[0, -2.35, 0]}>
        <mesh material={mats.gunmetal}>
          <cylinderGeometry args={[2.15, 2.45, 0.22, 64]} />
        </mesh>
        <mesh material={mats.steel} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[1.55, 1.9, 0.26, 64]} />
        </mesh>
        <mesh material={mats.core} position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.62, 0.012, 8, 128]} />
        </mesh>
      </group>
    </group>
  )
}

/* B — SOVEREIGN DEFENSE CORE. Reactor-grade hardware: eight chamfered armor
   petals around an octagonal red core, hex caps, sensor ring, heat fins.
   Engineering logic first; ornament nowhere. */
export function DefenseCore({ mats, open = 0 }: { mats: Mats; open?: number }) {
  const g = useRef<THREE.Group>(null!)
  const ring = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    g.current.rotation.y = t * 0.07
    ring.current.rotation.y = -t * 0.18
    mats.core.emissiveIntensity = 2.0 + Math.sin(t * 1.4) * 0.6
  })
  const PETALS = 8
  return (
    <group ref={g} position={[0, -0.15, 0]}>
      {/* internal core — octagonal, flat-shaded */}
      <mesh material={mats.core}>
        <cylinderGeometry args={[0.52, 0.52, 2.3, 8]} />
      </mesh>
      <mesh material={mats.glass}>
        <cylinderGeometry args={[0.78, 0.78, 2.32, 24, 1, true]} />
      </mesh>
      {/* armor petals, hinged open by `open` */}
      {Array.from({ length: PETALS }, (_, i) => {
        const a = (i / PETALS) * Math.PI * 2
        return (
          <group key={i} rotation={[0, a, 0]}>
            <group position={[1.12 + open * 0.42, 0, 0]} rotation={[0, 0, -0.1 - open * 0.34]}>
              <RoundedBox args={[0.24, 2.55, 0.62]} radius={0.05} smoothness={3} material={mats.obsidian} />
              {/* panel seam detail */}
              <mesh material={mats.gunmetal} position={[0.13, 0.6, 0]}>
                <boxGeometry args={[0.02, 0.9, 0.5]} />
              </mesh>
              <mesh material={mats.ember} position={[0.13, -0.95, 0]}>
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
      {/* sensor ring */}
      <group ref={ring} position={[0, 0.85, 0]}>
        <mesh material={mats.steel} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.78, 0.035, 10, 96]} />
        </mesh>
        <mesh material={mats.core} position={[1.78, 0, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
        </mesh>
      </group>
      {/* base platform */}
      <mesh material={mats.steel} position={[0, -2.28, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.24, 8]} />
      </mesh>
      <mesh material={mats.ember} position={[0, -2.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.014, 8, 96]} />
      </mesh>
    </group>
  )
}

/* C — DATA TEMPLE. Memory as architecture: an inverted obsidian ziggurat
   levitating over a ceramic dais, glass strata between plates, red light
   bleeding from the seams, a single column of signal holding it aloft. */
export function DataTemple({ mats, open = 0 }: { mats: Mats; open?: number }) {
  const g = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    g.current.position.y = 0.55 + Math.sin(t * 0.5) * 0.06
    g.current.rotation.y = t * 0.06
    mats.core.emissiveIntensity = 2.0 + Math.sin(t * 0.9) * 0.5
  })
  const plates = [1.15, 1.65, 2.15, 2.65, 3.15]
  return (
    <group>
      <group ref={g}>
        {plates.map((w, i) => {
          const y = i * (0.46 + open * 0.22)
          return (
            <group key={i} position={[0, y, 0]}>
              <RoundedBox args={[w, 0.3, w]} radius={0.05} smoothness={3} material={i % 2 ? mats.obsidian : mats.lacquer} />
              {i < plates.length - 1 && (
                <>
                  <mesh material={mats.glass} position={[0, 0.23, 0]}>
                    <boxGeometry args={[w * 0.82, 0.16, w * 0.82]} />
                  </mesh>
                  <mesh material={mats.core} position={[0, 0.23, 0]}>
                    <boxGeometry args={[w * 0.55, 0.05, w * 0.55]} />
                  </mesh>
                </>
              )}
            </group>
          )
        })}
        {/* gunmetal keystone */}
        <mesh material={mats.gunmetal} position={[0, plates.length * 0.46 + 0.32, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.5, 0.6, 4]} />
        </mesh>
      </group>
      {/* signal column */}
      <mesh material={mats.core} position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.6, 12]} />
      </mesh>
      {/* ceramic dais */}
      <group position={[0, -2.3, 0]}>
        <mesh material={mats.ceramic}>
          <cylinderGeometry args={[1.9, 2.2, 0.28, 64]} />
        </mesh>
        <mesh material={mats.gunmetal} position={[0, -0.24, 0]}>
          <cylinderGeometry args={[2.45, 2.6, 0.2, 64]} />
        </mesh>
        <mesh material={mats.core} position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.012, 8, 96]} />
        </mesh>
      </group>
    </group>
  )
}

function Rig() {
  useFrame(({ camera, pointer }, dt) => {
    const k = 1 - Math.pow(0.003, dt)
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * k
    camera.position.y += (0.7 + pointer.y * 0.5 - camera.position.y) * k
    camera.lookAt(0, -0.1, 0)
  })
  return null
}

/* Shared cinematography for fair comparison — identical light, env, post. */
export default function ProtoScene({ variant }: { variant: HeroDirection }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 34, near: 0.1, far: 80, position: [0, 0.7, 11.5] }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 14, 34]} />
      <ambientLight intensity={0.16} color="#20222a" />
      <spotLight
        position={[7, 12, 9]} angle={0.45} penumbra={1} intensity={480} color="#dfe4ee"
        distance={50} decay={1.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.0004}
      />
      <spotLight position={[-9, 3, -5]} angle={0.6} penumbra={1} intensity={170} color="#e10600" distance={36} decay={1.6} />
      <pointLight position={[0, -1, 9]} intensity={55} color="#8a90a0" distance={24} decay={1.7} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#cfd6e2" scale={[10, 14, 1]} position={[6, 6, 8]} />
        <Lightformer form="rect" intensity={1.1} color="#5a1010" scale={[8, 12, 1]} position={[-8, 2, -4]} />
        <Lightformer form="rect" intensity={0.7} color="#20242c" scale={[16, 16, 1]} position={[0, 10, -10]} />
      </Environment>
      <Inner variant={variant} />
      <ContactShadows position={[0, -2.62, 0]} opacity={0.75} scale={16} blur={2.4} far={7} resolution={1024} color="#000000" />
      <Rig />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        {[
          <Bloom key="b" intensity={0.62} luminanceThreshold={0.74} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />,
          <ToneMapping key="t" mode={ToneMappingMode.ACES_FILMIC} />,
          <Vignette key="v" eskil={false} offset={0.3} darkness={0.82} />,
          <SMAA key="s" />,
        ]}
      </EffectComposer>
    </Canvas>
  )
}

function Inner({ variant }: { variant: HeroDirection }) {
  const mats = useHeroMats()
  if (variant === 'a') return <Reliquary mats={mats} />
  if (variant === 'b') return <DefenseCore mats={mats} />
  return <DataTemple mats={mats} />
}
