import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-shell min-h-screen px-10 py-10 sm:px-12">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
