import { Page } from '../ui/Page'
import { CONTINUITY } from '../content/pages'

export function meta() {
  return [
    { title: 'Continuity — ARASAKA' },
    { name: 'description', content: CONTINUITY.lede },
  ]
}

export default function ContinuityRoute() {
  return <Page data={CONTINUITY} />
}
