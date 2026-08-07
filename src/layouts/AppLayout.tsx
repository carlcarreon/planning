import type { ReactNode } from 'react'
import BottomNav from '../components/BottomNav'

type PageKey = 'todo' | 'wishlist' | 'memories' | 'profile'

type AppLayoutProps = {
  children: ReactNode
  activePage: PageKey
  onSelectPage: (page: PageKey) => void
}

export default function AppLayout({
  children,
  activePage,
  onSelectPage,
}: AppLayoutProps) {
  return (
    <div className="app-shell min-h-screen flex flex-col bg-white text-slate-900">
      <header className="app-shell__header border-b border-slate-200">
        <p className="app-shell__eyebrow text-slate-500">header</p>
      </header>
      <main className="app-shell__content flex-1">{children}</main>
      <BottomNav activePage={activePage} onSelect={onSelectPage} />
    </div>
  )
}
