import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  BadgeCheckIcon,
  BellIcon,
  LogOutIcon,
  SearchIcon,
  XIcon,
  UserRound,
  SquarePen,
} from 'lucide-react'
import type { PageKey } from '../lib/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { ScrollArea } from '../components/ui/scroll-area'
import BottomNav from '../components/BottomNav'

type CurrentUser = {
  name: string
  email: string | null
  avatarUrl: string | null
}

type AppLayoutProps = {
  children: ReactNode
  activePage: PageKey
  onSelectPage: (page: PageKey) => void
  onAddItem?: () => void
  onSignOut: () => void | Promise<void>
  isSigningOut?: boolean
  currentUser: CurrentUser | null
  showHeader?: boolean
}

function HeaderAvatarMenu({
  currentUser,
  onSelectPage,
  onSignOut,
  isSigningOut = false,
}: Pick<AppLayoutProps, 'currentUser' | 'onSelectPage' | 'onSignOut' | 'isSigningOut'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar size="default" className="size-10 border-0 shadow-none after:border-0">
              {currentUser?.avatarUrl ? (
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              ) : null}
              <AvatarFallback className="bg-rose-50 text-rose-500">
                <UserRound className="size-4" aria-hidden="true" />
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
          <Avatar size="default" className="size-10 border-0 shadow-none after:border-0">
            {currentUser?.avatarUrl ? (
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            ) : null}
            <AvatarFallback className="bg-rose-50 text-rose-500">
              <UserRound className="size-4" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {currentUser?.name ?? 'User'}
            </p>
            <p className="truncate text-xs text-slate-500">
              {currentUser?.email ?? 'No email'}
            </p>
          </div>
        </div>

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              onSelectPage('profile')
            }}
          >
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          closeOnClick={false}
          disabled={isSigningOut}
          onClick={() => {
            void onSignOut()
          }}
        >
          <LogOutIcon />
          {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HeaderNotificationButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Notifications"
      className="size-10 rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
      title="Notifications"
    >
      <BellIcon className="size-4" aria-hidden="true" />
    </Button>
  )
}

function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        return
      }

      setIsOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="size-10 rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="size-4" aria-hidden="true" />
      </Button>
    )
  }

  return (
    <div ref={containerRef} className="flex min-w-0 flex-1 items-center">
      <div className="flex w-full min-w-0 items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
        <span className="flex size-10 shrink-0 items-center justify-center text-slate-400">
          <SearchIcon className="size-4" aria-hidden="true" />
        </span>
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          aria-label="Search"
          className="h-10 flex-1 border-0 bg-transparent px-0 text-sm shadow-none ring-0 focus-visible:ring-0"
        />
        <button
          type="button"
          aria-label="Close search"
          className="mr-1 flex size-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function HeaderAddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Add item"
      className="size-10 rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
      onClick={onClick}
    >
      <SquarePen className="size-4" aria-hidden="true" />
    </Button>
  )
}

export default function AppLayout({
  children,
  activePage,
  onSelectPage,
  onAddItem,
  onSignOut,
  isSigningOut,
  currentUser,
  showHeader = true,
}: AppLayoutProps) {
  return (
    <div className="app-shell min-h-screen flex flex-col bg-white text-slate-900">
      {showHeader ? (
        <header className="app-shell__header flex items-center justify-between px-2 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <HeaderSearch />
            {onAddItem ? <HeaderAddButton onClick={onAddItem} /> : null}
          </div>
          <div className="flex items-center gap-2">
            <HeaderNotificationButton />
            <HeaderAvatarMenu
              currentUser={currentUser}
              onSelectPage={onSelectPage}
              onSignOut={onSignOut}
              isSigningOut={isSigningOut}
            />
          </div>
        </header>
      ) : null}
      <main className="app-shell__content flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="app-shell__scroll-area">
          <div className="app-shell__page">{children}</div>
        </ScrollArea>
      </main>
      <BottomNav activePage={activePage} onSelect={onSelectPage} />
    </div>
  )
}
