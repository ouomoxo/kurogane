import { Page } from '../ui/Page'
import { INVESTORS } from '../content/pages'

export function meta() {
  return [
    { title: 'Investors — ARASAKA' },
    { name: 'description', content: INVESTORS.lede },
  ]
}

export default function InvestorsRoute() {
  return <Page data={INVESTORS} />
}
