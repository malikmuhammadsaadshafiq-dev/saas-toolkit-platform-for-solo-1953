import StackBundle from '@/components/StackBundle'
import { stacksData } from '@/lib/stacks-data'
import { toolsData } from '@/lib/tools-data'

export const metadata = { title: 'Curated Stacks — StackHunt' }

export default function StacksPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Curated stacks</h1>
        <p className="mt-2 text-sm text-slate-600">Battle-tested toolkits from indie founders.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stacksData.map((stack) => {
          const tools = stack.toolSlugs
            .map((slug) => toolsData.find((t) => t.slug === slug))
            .filter((t): t is NonNullable<typeof t> => Boolean(t))
          return <StackBundle key={stack.id} stack={stack} tools={tools} />
        })}
      </div>
    </main>
  )
}
