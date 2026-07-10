import { useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { useHeroMats } from './mats'

export type SceneVariant = 'lattice' | 'nodes' | 'archive' | 'network' | 'colonnade' | 'gimbal'

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

/* CONTINUITY — the archive, in the Data Temple language. Cognition strata as
   authored records: alternating obsidian/lacquer slabs separated by glass
   interlayers, each interlayer carrying a dim ember seam. One record is drawn
   out for review, its seam burning core-red. Gunmetal pylons rail the stack;
   the whole reliquary stands on the ceramic dais over a gunmetal skirt, with
   the ember index inlay and steel markers shared with the hero and colonnade. */
function Archive() {
  const mats = useHeroMats()
  const group = useRef<THREE.Group>(null!)
  const records = 9
  const slabH = 0.24
  const gapH = 0.07
  const drawn = 5
  const stackH = records * slabH + (records - 1) * gapH
  // Same local tuning as the colonnade — ceramic darkened for the hotter,
  // bloomless division rig — but the ember sits lower than the colonnade's
  // 0.9: this object carries eight seams, not one per stele, and at 0.9 the
  // stack reads as red stripes instead of stacked records.
  useLayoutEffect(() => {
    mats.ceramic.color.set('#9b978d')
    mats.ember.emissiveIntensity = 0.65
  }, [mats])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // shallow angle: the record faces must catch the front fill to separate
    group.current.rotation.y = -0.19 + Math.sin(t * 0.07) * 0.07
    mats.core.emissiveIntensity = 2.6 + Math.sin(t * 0.8) * 0.7
  })
  return (
    <group ref={group} position={[0, -1.35, 0]}>
      {Array.from({ length: records }, (_, i) => {
        const y = 0.1 + i * (slabH + gapH) + slabH / 2
        const isDrawn = i === drawn
        const z = isDrawn ? 0.62 : 0
        const shaft = i % 2 ? mats.obsidian : mats.lacquer
        return (
          <group key={i} position={[0, y, z]}>
            <mesh material={shaft}>
              <boxGeometry args={[3.9, slabH, 2.1]} />
            </mesh>
            {/* ceramic registry tag on each record face — gunmetal vanishes
                against obsidian head-on; the catalog must read in value */}
            <mesh material={mats.ceramic} position={[-1.5, 0, isDrawn ? 1.06 : 1.056]}>
              <boxGeometry args={[0.5, 0.06, 0.014]} />
            </mesh>
            {i < records - 1 && (
              <>
                {/* glass interlayer above the record, seam protruding past it */}
                <mesh material={mats.glass} position={[0, slabH / 2 + gapH / 2, isDrawn ? -0.31 : 0]}>
                  <boxGeometry args={[3.6, gapH, isDrawn ? 1.48 : 1.9]} />
                </mesh>
                <mesh material={mats.ember} position={[0, slabH / 2 + gapH / 2, -z]}>
                  <boxGeometry args={[3.7, 0.028, 1.94]} />
                </mesh>
              </>
            )}
            {isDrawn && (
              <>
                {/* the record under review: core seam on its exposed lip */}
                <mesh material={mats.core} position={[0, 0, 1.06]}>
                  <boxGeometry args={[3.94, 0.05, 0.03]} />
                </mesh>
                <mesh material={mats.steel} position={[1.6, 0, 1.08]}>
                  <boxGeometry args={[0.3, 0.09, 0.05]} />
                </mesh>
              </>
            )}
          </group>
        )
      })}
      {/* gunmetal capital sealing the stack */}
      <mesh material={mats.gunmetal} position={[0, 0.1 + stackH + 0.045, 0]}>
        <boxGeometry args={[4.15, 0.09, 2.3]} />
      </mesh>
      {/* archive pylons — steel plinth, gunmetal rail, ember index light */}
      {[-2.25, 2.25].map((px) => (
        <group key={px} position={[px, 0, 0]}>
          <mesh material={mats.steel} position={[0, 0.05, 0]}>
            <boxGeometry args={[0.42, 0.1, 1.0]} />
          </mesh>
          <mesh material={mats.gunmetal} position={[0, 0.1 + (stackH + 0.2) / 2, 0]}>
            <boxGeometry args={[0.26, stackH + 0.2, 0.62]} />
          </mesh>
          <mesh material={mats.ember} position={[px < 0 ? 0.14 : -0.14, 0.1 + (stackH + 0.2) / 2, 0]}>
            <boxGeometry args={[0.02, stackH - 0.3, 0.06]} />
          </mesh>
        </group>
      ))}
      {/* ceramic dais over gunmetal skirt, ember index inlay + steel markers */}
      <mesh material={mats.ceramic} position={[0, -0.09, 0]}>
        <boxGeometry args={[6.6, 0.18, 3.6]} />
      </mesh>
      <mesh material={mats.gunmetal} position={[0, -0.26, 0]}>
        <boxGeometry args={[7.1, 0.16, 4.0]} />
      </mesh>
      <mesh material={mats.ember} position={[0, 0.005, 1.42]}>
        <boxGeometry args={[5.8, 0.012, 0.03]} />
      </mesh>
      {[-2.2, 0, 2.2].map((mx) => (
        <mesh key={mx} material={mats.steel} position={[mx, 0.005, 1.62]}>
          <boxGeometry args={[0.16, 0.014, 0.05]} />
        </mesh>
      ))}
    </group>
  )
}

/* GLOBAL NETWORK — sovereign zones as architecture in the Data Temple language,
   not a stock globe. A ceramic command floor over a gunmetal skirt; six regional
   sovereignty steles (steel plinth, obsidian/lacquer shaft split by a glass
   stratum with an ember seam, gunmetal capital) ring a single red seat of
   command at the centre. Ember trunk lines are inlaid from the seat out to each
   zone; steel rim markers and a gunmetal orbital ring seal the floor. Governance
   rendered as an authored institution, sharing the hero's whole material set. */
function Network() {
  const mats = useHeroMats()
  const group = useRef<THREE.Group>(null!)
  // Deterministic sovereign zones — radius, angle, height. An institution does
  // not redraw its map on each visit. The command seat holds the centre.
  const zones = useMemo(() => {
    const rng = mulberry32(19)
    return Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 + 0.42
      const r = 1.7 + rng() * 0.75
      return { x: Math.cos(a) * r, z: Math.sin(a) * r, r, h: 0.82 + rng() * 0.5, i }
    })
  }, [])
  // Same local tuning as the colonnade/archive: darkened ceramic, brighter seam,
  // for the hotter bloomless division rig.
  useLayoutEffect(() => {
    mats.ceramic.color.set('#9b978d')
    mats.ember.emissiveIntensity = 0.85
  }, [mats])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.05
    mats.core.emissiveIntensity = 2.6 + Math.sin(t * 0.9) * 0.7
  })
  // One authored stele — plinth, split shaft with a seam of signal, capital.
  const stele = (h: number, shaft: THREE.Material, seam: THREE.Material, w: number) => {
    const lower = h * 0.58
    const strata = 0.12
    const upper = h - lower - strata
    return (
      <>
        <mesh material={mats.steel} position={[0, 0.05, 0]}>
          <boxGeometry args={[w + 0.16, 0.1, w + 0.16]} />
        </mesh>
        <mesh material={shaft} position={[0, 0.1 + lower / 2, 0]}>
          <boxGeometry args={[w, lower, w]} />
        </mesh>
        <mesh material={mats.glass} position={[0, 0.1 + lower + strata / 2, 0]}>
          <boxGeometry args={[w - 0.04, strata, w - 0.04]} />
        </mesh>
        <mesh material={seam} position={[0, 0.1 + lower + strata / 2, 0]}>
          <boxGeometry args={[w + 0.03, 0.05, w + 0.03]} />
        </mesh>
        <mesh material={shaft} position={[0, 0.1 + lower + strata + upper / 2, 0]}>
          <boxGeometry args={[w - 0.02, upper, w - 0.02]} />
        </mesh>
        <mesh material={mats.gunmetal} position={[0, 0.1 + h + 0.035, 0]}>
          <boxGeometry args={[w + 0.08, 0.07, w + 0.08]} />
        </mesh>
      </>
    )
  }
  return (
    <group ref={group} rotation={[0.08, 0, 0]} position={[0, -1.05, 0]}>
      {/* ember trunk lines — the seat's writ, inlaid from centre to each zone */}
      {zones.map((z) => (
        <group key={`t${z.i}`} rotation={[0, -Math.atan2(z.z, z.x), 0]}>
          <mesh material={mats.ember} position={[z.r / 2, 0.106, 0]}>
            <boxGeometry args={[z.r, 0.012, 0.03]} />
          </mesh>
        </group>
      ))}
      {/* the red seat of command at the centre */}
      <group position={[0, 0, 0]}>{stele(1.55, mats.obsidian, mats.core, 0.4)}</group>
      {/* regional sovereignty steles */}
      {zones.map((z) => (
        <group key={z.i} position={[z.x, 0, z.z]}>
          {stele(z.h, z.i % 2 ? mats.obsidian : mats.lacquer, mats.ember, 0.3)}
          {/* ember node pad seating each zone on the floor */}
          <mesh material={mats.ember} position={[0, 0.104, 0.28]}>
            <boxGeometry args={[0.34, 0.01, 0.03]} />
          </mesh>
        </group>
      ))}
      {/* ceramic command floor over gunmetal skirt */}
      <mesh material={mats.ceramic} position={[0, 0.01, 0]}>
        <cylinderGeometry args={[3.0, 3.0, 0.18, 72]} />
      </mesh>
      <mesh material={mats.gunmetal} position={[0, -0.16, 0]}>
        <cylinderGeometry args={[3.28, 3.16, 0.16, 72]} />
      </mesh>
      {/* steel rim markers, spaced around the floor's edge */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <mesh key={`m${i}`} material={mats.steel} position={[Math.cos(a) * 2.82, 0.105, Math.sin(a) * 2.82]} rotation={[0, -a, 0]}>
            <boxGeometry args={[0.05, 0.014, 0.16]} />
          </mesh>
        )
      })}
      {/* gunmetal orbital ring above the floor — the network's sovereign envelope */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.85, 0]} material={mats.gunmetal}>
        <torusGeometry args={[2.6, 0.012, 10, 128]} />
      </mesh>
    </group>
  )
}

/* CORPORATION — institutional timeline in the Data Temple language. Each era
   is an authored stele: steel plinth, alternating obsidian/lacquer shaft split
   by a glass stratum with an ember seam, gunmetal capital and edge trim. One
   era's seam burns red. The colonnade stands on a ceramic dais over a gunmetal
   skirt, service markers engraved on the rim — the hero's dais, elongated. */
function Colonnade() {
  const mats = useHeroMats()
  const group = useRef<THREE.Group>(null!)
  const stelae = [1.9, 2.3, 2.0, 2.6, 2.15, 2.45, 2.05, 2.7, 2.25]
  // Local tuning: this rig is hotter than the hero's and has no bloom, so the
  // ceramic must sit darker and the seams burn brighter to read.
  useLayoutEffect(() => {
    mats.ceramic.color.set('#9b978d')
    mats.ember.emissiveIntensity = 0.9
  }, [mats])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.06) * 0.14
    mats.core.emissiveIntensity = 2.6 + Math.sin(t * 0.8) * 0.7
  })
  return (
    <group ref={group} position={[0, -1.15, 0]}>
      {stelae.map((h, i) => {
        const x = (i - (stelae.length - 1) / 2) * 0.78
        const z = i % 2 ? -0.3 : 0.25
        const isEra = i === 5
        const shaft = i % 2 ? mats.obsidian : mats.lacquer
        const lower = h * 0.62
        const strata = 0.14
        const upper = h - lower - strata
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh material={mats.steel} position={[0, 0.05, 0]}>
              <boxGeometry args={[0.46, 0.1, 0.62]} />
            </mesh>
            <mesh material={shaft} position={[0, 0.1 + lower / 2, 0]}>
              <boxGeometry args={[0.34, lower, 0.5]} />
            </mesh>
            {/* gunmetal edge trim on the shaft face, as on the hero plates */}
            <mesh material={mats.gunmetal} position={[0, 0.24, 0.253]}>
              <boxGeometry args={[0.22, 0.035, 0.012]} />
            </mesh>
            {/* glass stratum — the archive gap — with its seam of signal */}
            <mesh material={mats.glass} position={[0, 0.1 + lower + strata / 2, 0]}>
              <boxGeometry args={[0.29, strata, 0.43]} />
            </mesh>
            {/* seam runs past the glass faces so it reads without bloom */}
            <mesh material={isEra ? mats.core : mats.ember} position={[0, 0.1 + lower + strata / 2, 0]}>
              <boxGeometry args={[0.31, 0.05, 0.45]} />
            </mesh>
            <mesh material={shaft} position={[0, 0.1 + lower + strata + upper / 2, 0]}>
              <boxGeometry args={[0.3, upper, 0.46]} />
            </mesh>
            <mesh material={mats.gunmetal} position={[0, 0.1 + h + 0.035, 0]}>
              <boxGeometry args={[0.38, 0.07, 0.54]} />
            </mesh>
          </group>
        )
      })}
      {/* ceramic dais over gunmetal skirt */}
      <mesh material={mats.ceramic} position={[0, -0.09, 0]}>
        <boxGeometry args={[8.4, 0.18, 2.6]} />
      </mesh>
      <mesh material={mats.gunmetal} position={[0, -0.26, 0]}>
        <boxGeometry args={[8.9, 0.16, 3.0]} />
      </mesh>
      {/* engraved timeline inlay running the dais, ember-lit */}
      <mesh material={mats.ember} position={[0, 0.005, 0.9]}>
        <boxGeometry args={[7.6, 0.012, 0.03]} />
      </mesh>
      {[-2.9, 0, 2.9].map((mx) => (
        <mesh key={mx} material={mats.steel} position={[mx, 0.005, 1.1]}>
          <boxGeometry args={[0.16, 0.014, 0.05]} />
        </mesh>
      ))}
    </group>
  )
}

/* ADVANCED SYSTEMS — precision as an object. Concentric gimbal rings in slow
   counter-rotation around a machined core; nothing hesitates. */
function Gimbal() {
  const r1 = useRef<THREE.Mesh>(null!)
  const r2 = useRef<THREE.Mesh>(null!)
  const r3 = useRef<THREE.Mesh>(null!)
  const core = useRef<THREE.MeshStandardMaterial>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    r1.current.rotation.x = t * 0.16
    r2.current.rotation.y = -t * 0.12
    r2.current.rotation.z = Math.PI / 2.4
    r3.current.rotation.z = t * 0.09
    core.current.emissiveIntensity = 1.7 + Math.sin(t * 1.3) * 0.5
  })
  return (
    <group position={[0, 0.15, 0]} scale={1.15}>
      <mesh ref={r1}>
        <torusGeometry args={[2.15, 0.035, 12, 128]} />
        <meshStandardMaterial color="#33363f" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[1.7, 0.03, 12, 128]} />
        <meshStandardMaterial color="#2b2d34" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.025, 12, 128]} />
        <meshStandardMaterial color="#454955" metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial ref={core} color="#1a0202" emissive="#e10600" emissiveIntensity={1.7} roughness={0.4} />
      </mesh>
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
      {variant === 'colonnade' && <Colonnade />}
      {variant === 'gimbal' && <Gimbal />}
    </Canvas>
  )
}
