import { Page } from '../ui/Page'
import { GLOBAL } from '../content/pages'

export function meta() {
  return [
    { title: 'Global Network — ARASAKA' },
    { name: 'description', content: GLOBAL.lede },
  ]
}

export default function GlobalNetworkRoute() {
  return <Page data={GLOBAL} />
}
