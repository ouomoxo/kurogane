import { useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

export type SceneVariant = 'lattice' | 'nodes' | 'archive' | 'network'

// Deterministic PRNG — the intelligence cloud must be identical on every visit;
// an institution does not improvise.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* SECURITY — threat interception lattice. A cubic grid of sentinels around a
   single red core: the protected principal, never shown, only implied. */
function Lattice() {
  const inst = useRef<THREE.InstancedMesh>(null!)
  const core = useRef<THREE.MeshStandardMaterial>(null!)
  const group = useRef<THREE.Group>(null!)
  const pts = useMemo(() => {
    const N = 5
    const s = 3.4
    const out: THREE.Vector3[] = []
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        for (let k = 0; k < N; k++) {
          if (i === 2 && j === 2 && k === 2) continue
          out.push(new THREE.Vector3((i / (N - 1) - 0.5) * s, (j / (N - 1) - 0.5) * s, (k / (N - 1) - 0.5) * s))
        }
    return out
  }, [])
  useLayoutEffect(() => {
    const d = new THREE.Object3D()
    pts.forEach((p, i) => {
      d.position.copy(p)
      d.updateMatrix()
      inst.current.setMatrixAt(i, d.matrix)
    })
    inst.current.instanceMatrix.needsUpdate = true
  }, [pts])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.09
    group.current.rotation.x = Math.sin(t * 0.13) * 0.1
    core.current.emissiveIntensity = 1.6 + Math.sin(t * 1.2) * 0.5
  })
  return (
    <group ref={group}>
      <instancedMesh
        ref={inst}
        args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, pts.length]}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#33363f" metalness={0.5} roughness={0.3} />
      </instancedMesh>
      <mesh>
        <boxGeometry args={[0.34, 0.34, 0.34]} />
        <meshStandardMaterial ref={core} color="#1a0202" emissive="#e10600" emissiveIntensity={1.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

/* INTELLIGENCE — a contracted data space. Minimal nodes, nearest-neighbour
   paths, one classified signal. */
function Nodes() {
  const group = useRef<THREE.Group>(null!)
  const redMat = useRef<THREE.MeshStandardMaterial>(null!)
  const { pos, seg, red } = useMemo(() => {
    const rng = mulberry32(7)
    const P: THREE.Vector3[] = []
    for (let i = 0; i < 88; i++) {
      const v = new THREE.Vector3(rng() * 2 - 1, (rng() * 2 - 1) * 0.5, rng() * 2 - 1)
      if (v.lengthSq() < 0.05) v.x += 0.3
      v.normalize().multiplyScalar(1.1 + rng() * 1.9)
      P.push(v)
    }
    const s: number[] = []
    P.forEach((p, i) => {
      P.map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((o) => o.j > i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach((o) => s.push(p.x, p.y, p.z, P[o.j].x, P[o.j].y, P[o.j].z))
    })
    return { pos: new Float32Array(P.flatMap((p) => [p.x, p.y, p.z])), seg: new Float32Array(s), red: P[31] }
  }, [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.06
    redMat.current.emissiveIntensity = 2 + Math.sin(t * 1.6) * 0.8
  })
  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#9fa3ab" sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[seg, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#23252b" transparent opacity={0.6} />
      </lineSegments>
      <mesh position={red}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial ref={redMat} color="#200303" emissive="#e10600" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

/* CONTINUITY — the archive. Stacked cognition strata; one record pulled for
   review, its edge still lit. */
function Archive() {
  const group = useRef<THREE.Group>(null!)
  const seam = useRef<THREE.MeshStandardMaterial>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = -0.5 + Math.sin(t * 0.08) * 0.06
    seam.current.emissiveIntensity = 1.4 + Math.sin(t * 0.9) * 0.4
  })
  return (
    <group ref={group} position={[0, -1.5, 0]}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[i === 7 ? 0.5 : 0, i * 0.26, 0]}>
          <boxGeometry args={[4.6, 0.14, 2.5]} />
          <meshStandardMaterial color="#2b2d34" metalness={0.45} roughness={0.36} />
        </mesh>
      ))}
      <mesh position={[0.5 + 2.31, 7 * 0.26, 0]}>
        <boxGeometry args={[0.02, 0.1, 2.3]} />
        <meshStandardMaterial ref={seam} color="#1a0202" emissive="#e10600" emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

/* GLOBAL NETWORK — sovereign zones as architecture, not a stock globe. A dark
   operational disc, regional pillars, one red seat of command, an orbital ring. */
function Network() {
  const group = useRef<THREE.Group>(null!)
  const tyo = useRef<THREE.MeshStandardMaterial>(null!)
  const sites: { x: number; z: number; h: number; red?: boolean }[] = [
    { x: 1.7, z: -0.3, h: 1.6, red: true },
    { x: -1.9, z: 0.5, h: 1.15 },
    { x: -0.6, z: -1.4, h: 0.85 },
    { x: 0.6, z: 1.5, h: 0.95 },
    { x: -1.2, z: -0.4, h: 0.6 },
    { x: 0.2, z: -0.9, h: 0.7 },
    { x: 1.0, z: 0.8, h: 0.55 },
  ]
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.07
    tyo.current.emissiveIntensity = 1.8 + Math.sin(t * 1.1) * 0.5
  })
  return (
    <group ref={group} rotation={[0.08, 0, 0]} position={[0, -0.7, 0]}>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[3.1, 3.1, 0.08, 64]} />
        <meshStandardMaterial color="#1c1e24" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.6, 0]}>
        <torusGeometry args={[2.7, 0.008, 8, 128]} />
        <meshStandardMaterial color="#454955" metalness={0.6} roughness={0.35} />
      </mesh>
      {sites.map((s, i) => (
        <mesh key={i} position={[s.x, s.h / 2, s.z]}>
          <boxGeometry args={[0.14, s.h, 0.14]} />
          {s.red ? (
            <meshStandardMaterial ref={tyo} color="#1a0202" emissive="#e10600" emissiveIntensity={1.8} roughness={0.35} />
          ) : (
            <meshStandardMaterial color="#33363f" metalness={0.5} roughness={0.3} />
          )}
        </mesh>
      ))}
    </group>
  )
}

function Rig() {
  useFrame(({ camera, pointer }, dt) => {
    const k = 1 - Math.pow(0.004, dt)
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * k
    camera.position.y += (1.4 + pointer.y * 0.4 - camera.position.y) * k
    camera.lookAt(0, 0.2, 0)
  })
  return null
}

// One restrained scene per division concept. No postprocessing — these bands
// must stay cheap; the homepage hero carries the heavy cinematography.
export default function DivisionScene({ variant }: { variant: SceneVariant }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 38, near: 0.1, far: 40, position: [0, 1.4, 7.4] }}
      gl={{ antialias: true, powerPreference: 'high-performance', stencil: false }}
    >
      <color attach="background" args={['#070708']} />
      <fog attach="fog" args={['#070708', 9, 17]} />
      <ambientLight intensity={0.55} color="#2a2d38" />
      <directionalLight position={[6, 8, 4]} intensity={3.4} color="#dfe4ee" />
      {/* front fill — the key alone leaves camera-facing surfaces unreadable */}
      <pointLight position={[0, 2.5, 8]} intensity={90} color="#9aa0b0" distance={26} decay={1.6} />
      <pointLight position={[-6, 2, -2]} intensity={26} color="#e10600" distance={20} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2} color="#cfd6e2" scale={[10, 12, 1]} position={[6, 5, 6]} />
        <Lightformer form="rect" intensity={0.9} color="#5a1010" scale={[8, 10, 1]} position={[-7, 2, -4]} />
        <Lightformer form="rect" intensity={0.6} color="#20242c" scale={[14, 14, 1]} position={[0, 9, -8]} />
      </Environment>
      <Rig />
      {variant === 'lattice' && <Lattice />}
      {variant === 'nodes' && <Nodes />}
      {variant === 'archive' && <Archive />}
      {variant === 'network' && <Network />}
    </Canvas>
  )
}
