import { useMemo } from 'react'
import * as THREE from 'three'

// Shared hero material system — obsidian / lacquer / ceramic / gunmetal /
// glass / emissive. One palette across every flagship object.
export function useHeroMats() {
  return useMemo(
    () => ({
      obsidian: new THREE.MeshPhysicalMaterial({
        color: '#0c0c10', metalness: 0.7, roughness: 0.24, clearcoat: 0.55, clearcoatRoughness: 0.3,
      }),
      lacquer: new THREE.MeshPhysicalMaterial({
        color: '#111116', metalness: 0.5, roughness: 0.18, clearcoat: 0.9, clearcoatRoughness: 0.12,
      }),
      ceramic: new THREE.MeshPhysicalMaterial({
        color: '#c8c4b9', metalness: 0.02, roughness: 0.4, clearcoat: 0.25, clearcoatRoughness: 0.55,
      }),
      gunmetal: new THREE.MeshStandardMaterial({ color: '#3a3d46', metalness: 0.9, roughness: 0.3 }),
      steel: new THREE.MeshStandardMaterial({ color: '#23252b', metalness: 0.85, roughness: 0.42 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#141821', metalness: 0, roughness: 0.06, transmission: 0.9, thickness: 0.5, ior: 1.4, transparent: true,
      }),
      core: new THREE.MeshStandardMaterial({ color: '#1a0202', emissive: new THREE.Color('#e10600'), emissiveIntensity: 2.2 }),
      ember: new THREE.MeshStandardMaterial({ color: '#160303', emissive: new THREE.Color('#8f0a0a'), emissiveIntensity: 1.0 }),
    }),
    [],
  )
}
export type HeroMats = ReturnType<typeof useHeroMats>
