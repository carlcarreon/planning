export type PageKey = 'checklist' | 'wishlist' | 'memories' | 'profile'
export type AuthPageKey = 'login' | 'register'
export type AppViewKey = PageKey | AuthPageKey

export const pathToPage: Record<string, PageKey> = {
  '/checklist': 'checklist',
  '/wishlist': 'wishlist',
  '/memories': 'memories',
  '/profile': 'profile',
}

export const pageToPath: Record<PageKey, string> = {
  checklist: '/checklist',
  wishlist: '/wishlist',
  memories: '/memories',
  profile: '/profile',
}

export const pathToAuthPage: Record<string, AuthPageKey> = {
  '/login': 'login',
  '/register': 'register',
}

export const authPageToPath: Record<AuthPageKey, string> = {
  login: '/login',
  register: '/register',
}

export function getPageFromPathname(pathname: string): PageKey {
  return pathToPage[pathname] ?? 'checklist'
}

export function getAuthPageFromPathname(pathname: string): AuthPageKey | null {
  return pathToAuthPage[pathname] ?? null
}
