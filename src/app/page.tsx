import Link from 'next/link'
import { ArrowRight, Search, Sparkles, Layers } from 'lucide-react'
import ToolCard from '@/components/ToolCard'
import { toolsData } from '@/lib/tools-data'

export default function HomePage() {
  const featured = toolsData.slice(0, 6)

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated by founders, for founders</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              The SaaS toolkit
              <br />
              for <span className="text-brand-600">solo founders</span>.
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
              Discover, compare, and save the tools indie makers actually ship with. 318+ tools indexed, 47 curated stacks, zero fluff.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-colors"
              >
                Browse all tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/stacks"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm border border-slate-200 transition-colors"
              >
                <Layers className="w-4 h-4" />
                Explore stacks
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Featured tools</h2>
            <p className="mt-2 text-sm text-slate-600">Hand-picked picks from the StackHunt index.</p>
          </div>
          <Link href="/tools" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Search className="w-10 h-10 mx-auto text-brand-500 mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built your own stack? Share it.</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Help other founders ship faster. Submit a tool you love, or share the bundle that powers your product.
          </p>
          <Link
            href="/submit"
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-colors"
          >
            Submit a tool
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
