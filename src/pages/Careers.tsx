import { Page } from '../ui/Page'
import { CAREERS } from '../content/pages'

export function meta() {
  return [
    { title: 'Careers — ARASAKA' },
    { name: 'description', content: CAREERS.lede },
  ]
}

export default function CareersRoute() {
  return <Page data={CAREERS} />
}
