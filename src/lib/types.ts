export type Category =
  | 'payments'
  | 'database'
  | 'deployment'
  | 'auth'
  | 'analytics'
  | 'email'
  | 'forms'
  | 'scheduling'
  | 'monitoring'
  | 'ai'
  | 'crm'
  | 'storage'

export type PricingType = 'free' | 'freemium' | 'paid' | 'open-source'

export type Stage = 'pre-launch' | 'early' | 'growth' | 'scale'

export interface Tool {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: Category
  pricing: PricingType
  stage: Stage[]
  affiliateUrl: string
  logoColor: string
  logoInitial: string
  monthlyPrice: string
  freeTier: boolean
  pros: string[]
  cons: string[]
  tags: string[]
  alternatives: string[]
  rating: number
  saves: number
  website: string
}

export interface Stack {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  toolSlugs: string[]
  stage: Stage
  monthlyEstimate: string
  saves: number
  category: string
  color: string
}

export type FilterState = {
  category: Category | 'all'
  pricing: PricingType | 'all'
  stage: Stage | 'all'
  search: string
}
