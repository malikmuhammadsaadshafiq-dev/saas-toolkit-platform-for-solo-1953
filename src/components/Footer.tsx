import Link from 'next/link'
import { Layers } from 'lucide-react'

const footerLinks = {
  Explore: [
    { label: 'Browse Tools', href: '/tools' },
    { label: 'Curated Stacks', href: '/stacks' },
    { label: 'Submit a Tool', href: '/submit' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Newsletter', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Affiliates', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <span className="font-bold text-white tracking-tight">StackHunt</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The SaaS toolkit directory built for founders who ship. 318+ tools indexed, 47 curated stacks.
            </p>
            <p className="text-xs text-slate-600 mt-8">
              &copy; {new Date().getFullYear()} StackHunt. Built by makers, for makers.
            </p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
