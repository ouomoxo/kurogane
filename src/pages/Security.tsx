import { Page } from '../ui/Page'
import { SECURITY } from '../content/pages'

export function meta() {
  return [
    { title: 'Security — ARASAKA' },
    { name: 'description', content: SECURITY.lede },
  ]
}

export default function SecurityRoute() {
  return <Page data={SECURITY} />
}
