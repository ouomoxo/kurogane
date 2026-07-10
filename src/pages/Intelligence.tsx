import { Page } from '../ui/Page'
import { INTELLIGENCE } from '../content/pages'

export function meta() {
  return [
    { title: 'Intelligence — ARASAKA' },
    { name: 'description', content: INTELLIGENCE.lede },
  ]
}

export default function IntelligenceRoute() {
  return <Page data={INTELLIGENCE} />
}
