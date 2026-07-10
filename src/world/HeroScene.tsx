import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, RoundedBox, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { useHeroMats, type HeroMats } from './mats'

type Tier = 'high' | 'low'

/* THE DATA TEMPLE — chosen hero direction (D-011, rendered comparison vs
   Corporate Reliquary and Sovereign Defense Core). Memory as architecture:
   an inverted obsidian ziggurat levitating over a ceramic dais, glass strata
   between plates, red light bleeding from the seams, one column of signal.
   Scroll separates the strata — the archive opens as the visitor descends. */

const PLATES = [1.15, 1.65, 2.15, 2.65, 3.15]

function Temple({
  mats,
  scrollY,
  reducedMotion,
  compact,
}: {
  mats: HeroMats
  scrollY: React.MutableRefObject<number>
  reducedMotion: boolean
  compact: boolean
}) {
  const float = useRef<THREE.Group>(null!)
  const plateRefs = useRef<(THREE.Group | null)[]>([])
  const keystone = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const open = reducedMotion ? 0.25 : 0.12 + scrollY.current * 0.9
    const gap = 0.46 + open * 0.5
    PLATES.forEach((_, i) => {
      const g = plateRefs.current[i]
      if (g) g.position.y = i * gap
    })
    if (keystone.current) keystone.current.position.y = PLATES.length * gap + 0.32
    if (!reducedMotion) {
      float.current.position.y = 0.55 + Math.sin(t * 0.5) * 0.06
      float.current.rotation.y = t * 0.06
      mats.core.emissiveIntensity = 2.0 + open * 1.2 + Math.sin(t * 0.9) * 0.45
    } else {
      float.current.position.y = 0.55
      mats.core.emissiveIntensity = 2.0
    }
  })

  return (
    <group position={[compact ? 0 : 1.35, 0, 0]} scale={compact ? 0.78 : 0.98}>
      <group ref={float}>
        {PLATES.map((w, i) => (
          <group key={i} ref={(el) => (plateRefs.current[i] = el)}>
            <RoundedBox args={[w, 0.3, w]} radius={0.05} smoothness={3} material={i % 2 ? mats.obsidian : mats.lacquer} />
            {/* authored panel detail: gunmetal edge trim + service indicator */}
            <mesh material={mats.gunmetal} position={[0, -0.06, w / 2 + 0.005]}>
              <boxGeometry args={[w * 0.62, 0.045, 0.012]} />
            </mesh>
            <mesh material={mats.gunmetal} position={[w / 2 + 0.005, -0.06, 0]}>
              <boxGeometry args={[0.012, 0.045, w * 0.62]} />
            </mesh>
            {i % 2 === 0 && (
              <mesh material={mats.ember} position={[w / 2 - 0.12, 0.02, w / 2 + 0.006]}>
                <boxGeometry args={[0.09, 0.03, 0.01]} />
              </mesh>
            )}
            {i < PLATES.length - 1 && (
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
        {/* engraved service markers on the dais rim */}
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
    </group>
  )
}

/* Camera with mass: damped dolly driven by scroll; slight pointer drift. */
function Dolly({ scrollY, compact }: { scrollY: React.MutableRefObject<number>; compact: boolean }) {
  const { camera, pointer } = useThree()
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.002, dt)
    const base = compact ? 14.6 : 12.6
    const tz = base - THREE.MathUtils.clamp(scrollY.current, 0, 1) * 2.6
    camera.position.z += (tz - camera.position.z) * k
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * k * 0.6
    camera.position.y += (0.7 + pointer.y * 0.35 - camera.position.y) * k * 0.6
    camera.lookAt(compact ? 0 : 0.9, 0.05, 0)
  })
  return null
}

export function HeroScene({
  tier,
  reducedMotion,
  scrollY,
}: {
  tier: Tier
  reducedMotion: boolean
  scrollY: React.MutableRefObject<number>
}) {
  const compact = typeof window !== 'undefined' && window.innerWidth < 780
  return (
    <Canvas
      shadows={tier === 'high'}
      dpr={[1, tier === 'high' ? 1.8 : 1.35]}
      gl={{ antialias: tier !== 'high', powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 34, near: 0.1, far: 90, position: [0, 0.7, compact ? 14.6 : 12.6] }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 15, 36]} />

      {/* Architectural lighting — cool key, red rim, restrained front fill */}
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

      <TempleWithMats scrollY={scrollY} reducedMotion={reducedMotion} compact={compact} />

      <ContactShadows
        position={[0, -2.82, 0]}
        opacity={0.72}
        scale={18}
        blur={2.4}
        far={7}
        resolution={tier === 'high' ? 1024 : 512}
        color="#000000"
      />

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

function TempleWithMats(props: {
  scrollY: React.MutableRefObject<number>
  reducedMotion: boolean
  compact: boolean
}) {
  const mats = useHeroMats()
  return <Temple mats={mats} {...props} />
}
