import type { Stack } from './types'

export const stacksData: Stack[] = [
  {
    id: '1',
    slug: 'indie-saas-starter',
    name: 'Indie SaaS Starter',
    tagline: 'Ship a full-stack SaaS in a weekend.',
    description:
      'The canonical stack for shipping a subscription SaaS fast. Covers auth, database, payments, deployment, and analytics. Zero infrastructure babysitting. Total cost at launch: under $30/mo.',
    toolSlugs: ['vercel', 'supabase', 'clerk', 'lemon-squeezy', 'posthog'],
    stage: 'early',
    monthlyEstimate: '$25–$45/mo',
    saves: 2104,
    category: 'SaaS',
    color: '#4f46e5',
  },
  {
    id: '2',
    slug: 'ai-wrapper-stack',
    name: 'AI Wrapper Stack',
    tagline: 'From API key to paying users in 72 hours.',
    description:
      'Build and monetize an AI-powered product without over-engineering. This stack handles the frontend, data layer, transactional emails, and lightweight analytics so you can focus on your LLM logic.',
    toolSlugs: ['vercel', 'supabase', 'resend', 'plausible', 'tally'],
    stage: 'early',
    monthlyEstimate: '$35–$60/mo',
    saves: 1847,
    category: 'AI',
    color: '#0ea5e9',
  },
  {
    id: '3',
    slug: 'zero-to-revenue',
    name: 'Zero to Revenue',
    tagline: 'Built for solo founders who want paying customers first.',
    description:
      'Optimize for speed-to-first-dollar. Collect leads with a form, deploy fast, accept payments without a Stripe integration, and capture your audience via newsletter. No fluff.',
    toolSlugs: ['railway', 'lemon-squeezy', 'tally', 'beehiiv'],
    stage: 'pre-launch',
    monthlyEstimate: '$5–$15/mo',
    saves: 1293,
    category: 'Bootstrapped',
    color: '#10b981',
  },
  {
    id: '4',
    slug: 'content-creator-engine',
    name: 'Content Creator Engine',
    tagline: 'Monetize your audience without a full SaaS product.',
    description:
      'For founders building in public or content-first. Grow a newsletter, automate scheduling, collect course or digital product payments, and capture leads — all without a single engineering hire.',
    toolSlugs: ['beehiiv', 'cal-com', 'tally', 'lemon-squeezy'],
    stage: 'pre-launch',
    monthlyEstimate: '$42–$75/mo',
    saves: 934,
    category: 'Content',
    color: '#f59e0b',
  },
  {
    id: '5',
    slug: 'growth-analytics-stack',
    name: 'Growth Analytics Stack',
    tagline: 'Instrument everything before you need to.',
    description:
      'Once you have traction, you need to understand it. This stack combines product analytics, privacy-friendly web stats, issue tracking, and team scheduling — without enterprise pricing.',
    toolSlugs: ['posthog', 'plausible', 'linear', 'cal-com'],
    stage: 'growth',
    monthlyEstimate: '$50–$90/mo',
    saves: 712,
    category: 'Analytics',
    color: '#8b5cf6',
  },
]
