import { Page } from '../ui/Page'
import { LEGAL } from '../content/pages'

export function meta() {
  return [
    { title: 'Legal & Classification — ARASAKA' },
    { name: 'description', content: LEGAL.lede },
  ]
}

export default function LegalRoute() {
  return <Page data={LEGAL} />
}
