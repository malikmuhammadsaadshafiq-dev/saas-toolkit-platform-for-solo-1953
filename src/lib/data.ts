import { toolsData } from './tools-data'
import { stacksData } from './stacks-data'
import type { Tool, Stack, Category, PricingType, Stage, FilterState } from './types'

export { toolsData, stacksData }
export type { Tool, Stack, Category, PricingType, Stage, FilterState }

export function getToolBySlug(slug: string): Tool | undefined {
  return toolsData.find((t) => t.slug === slug)
}

export function getStackBySlug(slug: string): Stack | undefined {
  return stacksData.find((s) => s.slug === slug)
}

export function getToolsBySlug(slugs: string[]): Tool[] {
  return slugs.flatMap((slug) => {
    const tool = toolsData.find((t) => t.slug === slug)
    return tool ? [tool] : []
  })
}

export function filterTools(tools: Tool[], filters: FilterState): Tool[] {
  return tools.filter((tool) => {
    const matchCategory = filters.category === 'all' || tool.category === filters.category
    const matchPricing = filters.pricing === 'all' || tool.pricing === filters.pricing
    const matchStage = filters.stage === 'all' || tool.stage.includes(filters.stage as Stage)
    const matchSearch =
      filters.search === '' ||
      tool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(filters.search.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(filters.search.toLowerCase()))
    return matchCategory && matchPricing && matchStage && matchSearch
  })
}

export const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'payments', label: 'Payments' },
  { value: 'database', label: 'Database' },
  { value: 'deployment', label: 'Deployment' },
  { value: 'auth', label: 'Auth' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'email', label: 'Email' },
  { value: 'forms', label: 'Forms' },
  { value: 'scheduling', label: 'Scheduling' },
  { value: 'crm', label: 'Project Mgmt' },
]

export const PRICING_OPTIONS: { value: PricingType | 'all'; label: string }[] = [
  { value: 'all', label: 'All pricing' },
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'open-source', label: 'Open Source' },
]

export const STAGE_OPTIONS: { value: Stage | 'all'; label: string }[] = [
  { value: 'all', label: 'All stages' },
  { value: 'pre-launch', label: 'Pre-launch' },
  { value: 'early', label: 'Early' },
  { value: 'growth', label: 'Growth' },
  { value: 'scale', label: 'Scale' },
]
