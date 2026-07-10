import { Environment, Lightformer, RoundedBox, MeshReflectorMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import type { HeroMats } from './mats'

export type Tier = 'high' | 'low'

/* THE MACHINE-SPACE HALL — shared staging (D-013). One hall, one light rig,
   one post chain, used by the production hero AND the /proto direction
   matrix, so any object placed here is judged under identical conditions. */

/* Perimeter security columns. `seamMat` carries the state-driven emissive
   channel (ignition order: last). */
export function HallColumns({ mats, seamMat }: { mats: HeroMats; seamMat: THREE.Material }) {
  return (
    <>
      {[-2.6, -1.55, -0.5, 0.55, 1.6, 2.65].map((a, i) => {
        const r = 8.2
        return (
          <group key={i} position={[Math.sin(a) * r, 0.6, -3.5 - Math.cos(a) * (r * 0.55)]}>
            <RoundedBox args={[0.62, 7.2, 0.62]} radius={0.06} smoothness={2} material={mats.obsidian} />
            <mesh material={seamMat} position={[0, 0.4, 0.315]}>
              <boxGeometry args={[0.03, 5.6, 0.012]} />
            </mesh>
            <mesh material={mats.gunmetal} position={[0, -2.9, 0]}>
              <boxGeometry args={[0.86, 0.35, 0.86]} />
            </mesh>
          </group>
        )
      })}
    </>
  )
}

/* Etched glyph on the fog wall — the seal, barely there. */
export function HallGlyph({ mats, seamMat, x = -1.5 }: { mats: HeroMats; seamMat: THREE.Material; x?: number }) {
  return (
    <group position={[x, 1.6, -13]}>
      <mesh material={mats.steel} rotation={[0, 0, -0.42]} position={[-1.05, 0, 0]}>
        <boxGeometry args={[0.14, 5.2, 0.05]} />
      </mesh>
      <mesh material={mats.steel} rotation={[0, 0, 0.42]} position={[1.05, 0, 0]}>
        <boxGeometry args={[0.14, 5.2, 0.05]} />
      </mesh>
      <mesh material={seamMat} position={[0, -1.35, 0]}>
        <boxGeometry args={[1.7, 0.1, 0.05]} />
      </mesh>
    </group>
  )
}

/* Reflective composite floor — reflections reveal form and make it a place.
   Tier-gated: low tier gets a satin plane + contact shadow instead. */
export function HallFloor({ tier }: { tier: Tier }) {
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

/* One light rig for the hall: key spot, red counter-spot, front fill, env. */
export function HallLighting({ tier }: { tier: Tier }) {
  return (
    <>
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
    </>
  )
}

/* One post chain for the hall. */
export function HallPost({ tier }: { tier: Tier }) {
  return (
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
  )
}
