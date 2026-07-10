import { Page } from '../ui/Page'
import { CONTACT } from '../content/pages'

export function meta() {
  return [
    { title: 'Contact — ARASAKA' },
    { name: 'description', content: CONTACT.lede },
  ]
}

export default function ContactRoute() {
  return <Page data={CONTACT} />
}
