'use client'

import Link from 'next/link'
import { ArrowRight, Bookmark } from 'lucide-react'
import type { Stack, Tool } from '@/lib/types'

function ToolPills({ tools }: { tools: Tool[] }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {tools.slice(0, 4).map((tool) => (
        <span
          key={tool.slug}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg text-xs font-medium text-slate-700 ring-1 ring-slate-200"
        >
          <span
            className="w-4 h-4 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
            style={{ backgroundColor: tool.logoColor }}
          >
            {tool.logoInitial[0]}
          </span>
          {tool.name}
        </span>
      ))}
      {tools.length > 4 && (
        <span className="text-xs text-slate-400 font-medium">+{tools.length - 4} more</span>
      )}
    </div>
  )
}

export default function StackBundle({ stack, tools }: { stack: Stack; tools: Tool[] }) {
  return (
    <Link
      href={`/stacks/${stack.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex-shrink-0"
          style={{ backgroundColor: stack.color + '20' }}
        >
          <div
            className="w-full h-full rounded-xl flex items-center justify-center"
            style={{ backgroundColor: stack.color + '15' }}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stack.color }} />
          </div>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="p-1.5 rounded-lg text-slate-300 hover:text-brand-500 hover:bg-brand-50 transition-colors"
          aria-label="Save stack"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-1">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{stack.category}</span>
      </div>
      <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-brand-600 transition-colors">
        {stack.name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">{stack.tagline}</p>

      <ToolPills tools={tools} />

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="font-medium text-slate-600">{stack.monthlyEstimate}</span>
          <span>·</span>
          <span>{stack.saves.toLocaleString()} saves</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  )
}
