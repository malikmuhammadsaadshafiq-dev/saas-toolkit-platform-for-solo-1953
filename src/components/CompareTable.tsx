import Link from 'next/link'
import { Check, X, Star } from 'lucide-react'
import type { Tool } from '@/lib/types'
import PricingBadge from './PricingBadge'

function ToolLogo({ tool }: { tool: Tool }) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
      style={{ backgroundColor: tool.logoColor }}
    >
      {tool.logoInitial}
    </div>
  )
}

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
  ) : (
    <X className="w-4 h-4 text-slate-300 mx-auto" />
  )
}

export default function CompareTable({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="text-left px-5 py-4 font-semibold text-slate-700 w-40">Tool</th>
            <th className="text-left px-4 py-4 font-semibold text-slate-700">Pricing</th>
            <th className="text-center px-4 py-4 font-semibold text-slate-700">Free Tier</th>
            <th className="text-left px-4 py-4 font-semibold text-slate-700">Monthly</th>
            <th className="text-center px-4 py-4 font-semibold text-slate-700">Rating</th>
            <th className="px-4 py-4 w-16" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tools.map((tool) => (
            <tr key={tool.slug} className="hover:bg-slate-50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <ToolLogo tool={tool} />
                  <span className="font-medium text-slate-900">{tool.name}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <PricingBadge pricing={tool.pricing} size="xs" />
              </td>
              <td className="px-4 py-4 text-center">
                <BoolCell value={tool.freeTier} />
              </td>
              <td className="px-4 py-4 text-slate-500 text-xs">{tool.monthlyPrice}</td>
              <td className="px-4 py-4 text-center">
                <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {tool.rating}
                </span>
              </td>
              <td className="px-4 py-4">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
