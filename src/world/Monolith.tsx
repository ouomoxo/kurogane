import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// The core system: a sealed memory core rendered as a segmented obsidian
// monolith. Designed silhouette (stacked bevelled segments, a recessed spine
// carrying a single active red line), believable material separation, damped
// response to the pointer — never free orbit.

interface Props {
  reducedMotion: boolean
  scrollY?: React.MutableRefObject<number>
}

const SEGMENTS = [
  { h: 2.9, d: 2.3, w: 2.3 },
  { h: 2.4, d: 2.15, w: 2.15 },
  { h: 3.2, d: 2.35, w: 2.35 },
  { h: 2.2, d: 2.05, w: 2.05 },
  { h: 2.6, d: 2.2, w: 2.2 },
]

export function Monolith({ reducedMotion, scrollY }: Props) {
  const group = useRef<THREE.Group>(null!)

  const obsidian = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0a0a0b'),
        roughness: 0.34,
        metalness: 0.72,
        envMapIntensity: 1.15,
      }),
    [],
  )
  const ceramic = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#15151a'),
        roughness: 0.55,
        metalness: 0.4,
        envMapIntensity: 0.8,
      }),
    [],
  )
  const redSeam = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a0202'),
        emissive: new THREE.Color('#e10600'),
        emissiveIntensity: 2.4,
        roughness: 0.4,
        metalness: 0.2,
      }),
    [],
  )

  // stacked segment y-offsets
  const stack = useMemo(() => {
    let y = 0
    const out: { y: number; s: (typeof SEGMENTS)[number] }[] = []
    const total = SEGMENTS.reduce((a, s) => a + s.h + 0.06, 0)
    y = -total / 2
    for (const s of SEGMENTS) {
      out.push({ y: y + s.h / 2, s })
      y += s.h + 0.06
    }
    return out
  }, [])

  useFrame((state, dt) => {
    if (!group.current) return
    const k = 1 - Math.pow(0.001, dt)
    // damped pointer parallax — a slow authoritative tilt, bounded
    const tx = reducedMotion ? 0 : state.pointer.x * 0.16
    const ty = reducedMotion ? 0 : -state.pointer.y * 0.1
    group.current.rotation.y += (tx - group.current.rotation.y) * k * 0.6
    group.current.rotation.x += (ty - group.current.rotation.x) * k * 0.6
    // extremely slow idle drift so the mass reads as alive, not spinning
    if (!reducedMotion) group.current.rotation.y += dt * 0.03
    // scroll separates the stack subtly (real narrative link)
    const sep = scrollY ? THREE.MathUtils.clamp(scrollY.current, 0, 1) : 0
    group.current.children.forEach((child, i) => {
      const base = stack[i]?.y
      if (base !== undefined) child.position.y = base + (i - 2) * sep * 0.5
    })
    // the active line pulses like a heartbeat kept in an inert core
    redSeam.emissiveIntensity =
      2.1 + (reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.4) * 0.5)
  })

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      {stack.map(({ y, s }, i) => (
        <group key={i} position={[0, y, 0]}>
          <RoundedBox
            args={[s.w, s.h, s.d]}
            radius={0.05}
            smoothness={4}
            castShadow
            receiveShadow
            material={i % 2 === 0 ? obsidian : ceramic}
          />
          {/* recessed red spine on the front face of every other segment */}
          <mesh position={[0, 0, s.d / 2 + 0.001]} material={redSeam}>
            <planeGeometry args={[0.12, s.h * 0.72]} />
          </mesh>
        </group>
      ))}
      {/* base plinth */}
      <mesh position={[0, -7.4, 0]} receiveShadow material={ceramic}>
        <cylinderGeometry args={[2.1, 2.4, 0.5, 48]} />
      </mesh>
    </group>
  )
}
