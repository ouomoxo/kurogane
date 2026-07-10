import { Page } from '../ui/Page'
import { CORPORATION } from '../content/pages'

export function meta() {
  return [
    { title: 'The Corporation — ARASAKA' },
    { name: 'description', content: CORPORATION.lede },
  ]
}

export default function CorporationRoute() {
  return <Page data={CORPORATION} />
}
