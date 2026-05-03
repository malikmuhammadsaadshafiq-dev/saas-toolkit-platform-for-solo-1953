'use client'

import Link from 'next/link'
import { Star, Bookmark } from 'lucide-react'
import type { Tool } from '@/lib/types'
import PricingBadge from './PricingBadge'

function ToolLogo({ tool }: { tool: Tool }) {
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: tool.logoColor }}
    >
      {tool.logoInitial}
    </div>
  )
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <ToolLogo tool={tool} />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-brand-600 transition-colors">
              {tool.name}
            </h3>
            <span className="text-xs text-slate-400 capitalize">{tool.category}</span>
          </div>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="p-1.5 rounded-lg text-slate-300 hover:text-brand-500 hover:bg-brand-50 transition-colors"
          aria-label="Save tool"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">{tool.tagline}</p>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <PricingBadge pricing={tool.pricing} size="xs" />
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-600">{tool.rating}</span>
          <span className="text-slate-300">·</span>
          <span>{tool.saves.toLocaleString()} saves</span>
        </div>
      </div>
    </Link>
  )
}
