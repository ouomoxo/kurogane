export function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
export function isTouch(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches
}
export function performanceTier(): 'high' | 'low' {
  if (typeof navigator === 'undefined') return 'high'
  const cores = navigator.hardwareConcurrency ?? 4
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4
  return isTouch() || cores <= 4 || mem <= 4 ? 'low' : 'high'
}
export function sessionClass() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UNKNOWN'
  const locale = (navigator.language || 'en').toUpperCase()
  const pointer = isTouch() ? 'TACTILE' : 'PRECISION'
  const vp = window.innerWidth < 720 ? 'COMPACT' : window.innerWidth < 1280 ? 'STANDARD' : 'WIDE'
  return { tz, locale, pointer, vp }
}
