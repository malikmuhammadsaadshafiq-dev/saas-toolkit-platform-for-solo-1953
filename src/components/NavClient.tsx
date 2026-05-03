'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface NavLink {
  href: string
  label: string
}

export default function NavClient({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-white border-t border-slate-200">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-3 pt-3">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-3 text-base font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
