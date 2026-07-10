import { Page } from '../ui/Page'
import { ADVANCED } from '../content/pages'

export function meta() {
  return [
    { title: 'Advanced Systems — ARASAKA' },
    { name: 'description', content: ADVANCED.lede },
  ]
}

export default function AdvancedSystemsRoute() {
  return <Page data={ADVANCED} />
}
