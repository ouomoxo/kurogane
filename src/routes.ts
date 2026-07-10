import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/Home.tsx'),
  route('corporation', 'pages/Corporation.tsx'),
  route('security', 'pages/Security.tsx'),
  route('intelligence', 'pages/Intelligence.tsx'),
  route('advanced-systems', 'pages/AdvancedSystems.tsx'),
  route('continuity', 'pages/Continuity.tsx'),
  route('global-network', 'pages/GlobalNetwork.tsx'),
  route('investors', 'pages/Investors.tsx'),
  route('careers', 'pages/Careers.tsx'),
  route('contact', 'pages/Contact.tsx'),
  route('legal', 'pages/Legal.tsx'),
  route('proto', 'pages/ProtoHero.tsx'),
  route('*', 'pages/NotFound.tsx'),
] satisfies RouteConfig
