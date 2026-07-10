import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { Monolith } from './Monolith'

type Tier = 'high' | 'low'

function Dolly({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.002, dt)
    const target = 15 - THREE.MathUtils.clamp(scrollY.current, 0, 1) * 3.2
    camera.position.z += (target - camera.position.z) * k
    camera.lookAt(0, 0.3, 0)
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
  const created = useRef(false)
  return (
    <Canvas
      shadows={tier === 'high'}
      dpr={[1, tier === 'high' ? 1.8 : 1.35]}
      gl={{ antialias: tier !== 'high', powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 34, near: 0.1, far: 120, position: [0, 0.6, 15] }}
      onCreated={() => (created.current = true)}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 20, 46]} />

      {/* Architectural lighting — large soft key, narrow red rim, cool top */}
      <ambientLight intensity={0.12} color="#20222a" />
      <spotLight
        position={[8, 14, 10]}
        angle={0.5}
        penumbra={1}
        intensity={tier === 'high' ? 420 : 300}
        color="#dfe4ee"
        distance={60}
        decay={1.4}
        castShadow={tier === 'high'}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
      />
      <spotLight
        position={[-9, 4, -6]}
        angle={0.6}
        penumbra={1}
        intensity={140}
        color="#e10600"
        distance={40}
        decay={1.6}
      />
      <pointLight position={[0, -6, 8]} intensity={30} color="#3a3f4a" distance={30} />

      {/* Env map built from geometry lights — no external HDRI, works offline */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#cfd6e2" scale={[10, 14, 1]} position={[6, 6, 8]} />
        <Lightformer form="rect" intensity={1.1} color="#5a1010" scale={[8, 12, 1]} position={[-8, 2, -4]} />
        <Lightformer form="rect" intensity={0.7} color="#20242c" scale={[16, 16, 1]} position={[0, 10, -10]} />
      </Environment>

      <Monolith reducedMotion={reducedMotion} scrollY={scrollY} />

      <ContactShadows
        position={[0, -7.65, 0]}
        opacity={0.7}
        scale={22}
        blur={2.6}
        far={9}
        resolution={tier === 'high' ? 1024 : 512}
        color="#000000"
      />

      <Dolly scrollY={scrollY} />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        {[
          <Bloom
            key="b"
            intensity={tier === 'high' ? 0.7 : 0.5}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.72}
          />,
          <ToneMapping key="t" mode={ToneMappingMode.ACES_FILMIC} />,
          <Vignette key="v" eskil={false} offset={0.3} darkness={0.82} />,
          ...(tier === 'high' ? [<SMAA key="s" />] : []),
        ]}
      </EffectComposer>
    </Canvas>
  )
}
