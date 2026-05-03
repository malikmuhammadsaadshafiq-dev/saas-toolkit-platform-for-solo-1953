import ToolCard from '@/components/ToolCard'
import { toolsData } from '@/lib/tools-data'

export const metadata = { title: 'Browse Tools — StackHunt' }

export default function ToolsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Browse tools</h1>
        <p className="mt-2 text-sm text-slate-600">{toolsData.length} SaaS tools, indexed and compared.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsData.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </main>
  )
}
