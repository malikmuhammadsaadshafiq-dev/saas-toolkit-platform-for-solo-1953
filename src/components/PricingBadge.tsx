import type { PricingType } from '@/lib/types'

const variants: Record<PricingType, { label: string; className: string }> = {
  free: { label: 'Free', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  freemium: { label: 'Freemium', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  paid: { label: 'Paid', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
  'open-source': { label: 'Open Source', className: 'bg-blue-50 text-blue-700 ring-blue-200' },
}

export default function PricingBadge({
  pricing,
  size = 'sm',
}: {
  pricing: PricingType
  size?: 'xs' | 'sm'
}) {
  const { label, className } = variants[pricing]
  return (
    <span
      className={`inline-flex items-center font-medium ring-1 rounded-full ${className} ${
        size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {label}
    </span>
  )
}
