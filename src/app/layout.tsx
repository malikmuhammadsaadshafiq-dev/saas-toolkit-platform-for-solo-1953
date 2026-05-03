import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'StackHunt — SaaS Toolkit Directory for Solo Founders',
  description:
    'Discover, compare, and save the best SaaS tools. Curated stacks built by indie makers for founders who ship fast.',
  keywords: 'saas tools, indie founders, startup tools, saas stack, tool comparison',
  openGraph: {
    title: 'StackHunt — SaaS Toolkit Directory for Solo Founders',
    description: 'Find your perfect stack. 318+ tools indexed, 47 curated bundles.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
