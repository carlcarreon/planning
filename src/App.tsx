import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

import AddItemDialog from './components/AddItemDialog'
import { AppPageSkeleton, AppShellSkeleton, AuthPageSkeleton } from './components/page-skeletons'
import {
  initialChecklistItems,
  initialWishlistItems,
  type ListItem,
} from './lib/list-items'
import { supabase } from './lib/supabase'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import {
  authPageToPath,
  getAuthPageFromPathname,
  getPageFromPathname,
  pageToPath,
  type AuthPageKey,
  type PageKey,
} from './lib/navigation'

const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const ChecklistPage = lazy(() => import('./pages/checklist'))
const MemoriesPage = lazy(() => import('./pages/memories'))
const ProfilePage = lazy(() => import('./pages/profile'))
const WishlistPage = lazy(() => import('./pages/wishlist'))

const protectedPages: PageKey[] = ['checklist', 'wishlist', 'memories', 'profile']
type AddablePage = Extract<PageKey, 'checklist' | 'wishlist'>

function App() {
  const [activePage, setActivePage] = useState<PageKey>(() => getPageFromPathname(window.location.pathname))
  const [activeAuthPage, setActiveAuthPage] = useState<AuthPageKey | null>(() =>
    getAuthPageFromPathname(window.location.pathname),
  )
  const [checklistItems, setChecklistItems] = useState<ListItem[]>(() => initialChecklistItems)
  const [wishlistItems, setWishlistItems] = useState<ListItem[]>(() => initialWishlistItems)
  const [activeAddPage, setActiveAddPage] = useState<AddablePage | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const nextItemIdRef = useRef(4)

  const syncRouteState = useCallback((pathname: string, authenticated: boolean) => {
    const nextAuthPage = getAuthPageFromPathname(pathname)
    const nextPage = getPageFromPathname(pathname)
    const isProtected = protectedPages.includes(nextPage)

    if (authenticated) {
      if (nextAuthPage) {
        setActiveAuthPage(null)
        setActivePage('checklist')

        if (window.location.pathname !== '/checklist') {
          window.history.replaceState({}, '', '/checklist')
        }

        return
      }

      if (isProtected) {
        setActiveAuthPage(null)
        setActivePage(nextPage)
        return
      }

      setActiveAuthPage(null)
      setActivePage('checklist')
      return
    }

    if (isProtected) {
      setActiveAuthPage('login')
      setActivePage('checklist')

      if (window.location.pathname !== '/login') {
        window.history.replaceState({}, '', '/login')
      }

      return
    }

    if (nextAuthPage) {
      setActiveAuthPage(nextAuthPage)
      setActivePage('checklist')
      return
    }

    setActiveAuthPage('login')
    setActivePage('checklist')

    if (window.location.pathname !== '/login') {
      window.history.replaceState({}, '', '/login')
    }
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return
      }

      setSession(data.session ?? null)
      setIsAuthenticated(Boolean(data.session))
      setIsAuthReady(true)
      syncRouteState(window.location.pathname, Boolean(data.session))
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsAuthenticated(Boolean(session))
      syncRouteState(window.location.pathname, Boolean(session))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [syncRouteState])

  useEffect(() => {
    const handlePopState = () => {
      syncRouteState(window.location.pathname, isAuthenticated)
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [isAuthenticated, syncRouteState])

  useEffect(() => {
    if (activeAuthPage) {
      const canonicalPath = authPageToPath[activeAuthPage]

      if (window.location.pathname !== canonicalPath) {
        window.history.replaceState({}, '', canonicalPath)
      }

      return
    }

    const canonicalPath = pageToPath[activePage]

    if (window.location.pathname !== canonicalPath) {
      window.history.replaceState({}, '', canonicalPath)
    }
  }, [activeAuthPage, activePage])

  useEffect(() => {
    if (activeAddPage && activeAddPage !== activePage) {
      setActiveAddPage(null)
    }
  }, [activeAddPage, activePage])

  const handleSelectPage = (page: PageKey | AuthPageKey) => {
    const nextPath = page in pageToPath ? pageToPath[page as PageKey] : authPageToPath[page as AuthPageKey]

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }

    if (page === 'login' || page === 'register') {
      setActiveAuthPage(page)
      return
    }

    setActiveAuthPage(null)
    setActivePage(page)
  }

  const handleOpenAddItem = useCallback(() => {
    if (activePage === 'checklist' || activePage === 'wishlist') {
      setActiveAddPage(activePage)
    }
  }, [activePage])

  const handleAddItem = useCallback(
    (item: { name: string; imageUrls?: string[]; dueDate?: Date; tags?: ListItem['tags'] }) => {
      const nextItem: ListItem = {
        id: nextItemIdRef.current,
        name: item.name,
        date: new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
        }).format(item.dueDate ?? new Date()),
        tags: item.tags,
        imageUrls: item.imageUrls,
      }

      nextItemIdRef.current += 1

      if (activeAddPage === 'checklist') {
        setChecklistItems((current) => [...current, nextItem])
      }

      if (activeAddPage === 'wishlist') {
        setWishlistItems((current) => [...current, nextItem])
      }

      setActiveAddPage(null)
    },
    [activeAddPage],
  )

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      setIsSigningOut(false)
      return
    }

    setSession(null)
    setIsAuthenticated(false)
    setActiveAuthPage('login')
    setActivePage('checklist')
    setIsSigningOut(false)

    if (window.location.pathname !== '/login') {
      window.history.replaceState({}, '', '/login')
    }
  }, [])

  const currentUser = session?.user
    ? {
        name:
          (session.user.user_metadata?.full_name as string | undefined) ??
          (session.user.user_metadata?.username as string | undefined) ??
          session.user.email ??
          'User',
        email: session.user.email ?? null,
        avatarUrl:
          (session.user.user_metadata?.avatar_url as string | undefined) ??
          (session.user.user_metadata?.picture as string | undefined) ??
          null,
      }
    : null

  if (!isAuthReady) {
    if (activeAuthPage) {
      return (
        <AuthLayout>
          <AuthPageSkeleton page={activeAuthPage} />
        </AuthLayout>
      )
    }

    return (
      <AppShellSkeleton
        page={activePage}
        showHeader={activePage !== 'profile'}
      />
    )
  }

  if (activeAuthPage) {
    return (
      <AuthLayout>
        <Suspense fallback={<AuthPageSkeleton page={activeAuthPage} />}>
          {activeAuthPage === 'login' && <LoginPage onSignUp={() => handleSelectPage('register')} />}
          {activeAuthPage === 'register' && <RegisterPage onLogin={() => handleSelectPage('login')} />}
        </Suspense>
      </AuthLayout>
    )
  }

  const addItemPage = activePage === 'checklist' || activePage === 'wishlist' ? activePage : null

  return (
    <>
      <AppLayout
        activePage={activePage}
        onSelectPage={handleSelectPage}
        onAddItem={addItemPage ? handleOpenAddItem : undefined}
        onSignOut={handleSignOut}
        isSigningOut={isSigningOut}
        currentUser={currentUser}
        showHeader={activePage !== 'profile'}
      >
        <Suspense fallback={<AppPageSkeleton page={activePage} />}>
          {activePage === 'checklist' && <ChecklistPage items={checklistItems} />}
          {activePage === 'wishlist' && <WishlistPage items={wishlistItems} />}
          {activePage === 'memories' && <MemoriesPage />}
          {activePage === 'profile' && <ProfilePage />}
        </Suspense>
      </AppLayout>

      {activeAddPage ? (
        <AddItemDialog
          open={Boolean(activeAddPage)}
          page={activeAddPage}
          onOpenChange={(open) => {
            if (!open) {
              setActiveAddPage(null)
            }
          }}
          onSubmit={handleAddItem}
        />
      ) : null}
    </>
  )
}

export default App
