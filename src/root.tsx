import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { Nav } from './ui/Nav'
import { Footer } from './ui/Footer'
import './styles/global.css'

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23050505'/%3E%3Cpath d='M16 5 L25 27 L18 27 L16 21 L14 27 L7 27 Z' fill='none' stroke='%23E10600' stroke-width='1.4'/%3E%3C/svg%3E"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#050505" />
        <meta name="build" content={import.meta.env.VITE_BUILD_ID ?? 'local'} />
        <meta property="og:type" content="website" />
        <link rel="icon" href={FAVICON} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Marks JS-capable clients so scroll reveals can start hidden; without
            JS the prerendered content stays fully visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <noscript>
          The Arasaka public access node requires an active client runtime for the full
          experience. Institutional records remain readable below.
        </noscript>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}
