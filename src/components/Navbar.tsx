import Link from 'next/link'
import { Layers } from 'lucide-react'
import NavClient from './NavClient'

const navLinks = [
  { href: '/tools', label: 'Browse Tools' },
  { href: '/stacks', label: 'Stacks' },
  { href: '/submit', label: 'Submit a Tool' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <Layers className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">StackHunt</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors active:scale-[0.98]"
            >
              Sign in
            </Link>
            <NavClient navLinks={navLinks} />
          </div>
        </div>
      </div>
    </header>
  )
}
