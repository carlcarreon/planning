import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { Button } from '../../components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../components/ui/input-group'
import { resolveLoginEmail } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import AuthHero from './AuthHero'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
      <path fill="#4285F4" d="M21.6 12.27c0-.68-.06-1.36-.18-2.01H12v3.81h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.32Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.89 6.63-2.41l-3.24-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.75-5.58-4.1H2.55v2.57A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.42 13.95A5.98 5.98 0 0 1 6.1 12c0-.68.12-1.34.32-1.95V7.48H2.55A10 10 0 0 0 2 12c0 1.61.39 3.13 1.08 4.47l3.34-2.52Z" />
      <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.7 9.7 0 0 0 12 2C8.61 2 5.67 3.95 4.08 6.48l3.34 2.57C7.2 6.83 9.4 5.96 12 5.96Z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
      <path
        fill="currentColor"
        d="M16.37 13.15c0-2.33 1.94-3.44 2.03-3.5-1.1-1.6-2.8-1.83-3.4-1.85-1.45-.15-2.84.85-3.57.85-.74 0-1.89-.83-3.1-.81-1.58.02-3.04.92-3.85 2.35-1.65 2.86-.42 7.09 1.18 9.42.79 1.14 1.71 2.42 2.92 2.37 1.16-.05 1.6-.74 3.01-.74 1.4 0 1.8.74 3.02.71 1.24-.02 2.02-1.15 2.79-2.3.9-1.33 1.28-2.62 1.3-2.68-.03-.01-2.5-.96-2.53-3.82Zm-2.39-6.95c.67-.81 1.12-1.93.99-3.05-.96.04-2.13.66-2.81 1.46-.6.69-1.14 1.83-.99 2.93 1.07.08 2.17-.56 2.81-1.34Z"
      />
    </svg>
  )
}

type LoginPageProps = {
  onSignUp: () => void
}

export default function LoginPage({ onSignUp }: LoginPageProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSignUp = () => {
    onSignUp()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    let email: string

    try {
      email = await resolveLoginEmail(identifier)
    } catch (lookupError) {
      setIsSubmitting(false)
      setErrorMessage(
        lookupError instanceof Error ? lookupError.message : 'Unable to resolve username.',
      )
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    window.history.pushState({}, '', '/checklist')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <section className="w-full space-y-12 px-4 text-left">
      <AuthHero />

      <div className="space-y-6">
        <div className="text-left">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-slate-900">
            Welcome back! 👋
          </h1>
          <p className="text-sm text-slate-500">
            Log in to continue your memories
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Email or Username</span>
            <InputGroup className="h-12 rounded-sm border-slate-200 py-1 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <InputGroupAddon className="px-3 py-0 text-rose-400">
                <Mail className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Enter your email or username"
                className="text-[15px] placeholder:text-slate-400"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                required
              />
            </InputGroup>
          </label>

          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Password</span>
            <InputGroup className="h-12 rounded-sm border-slate-200 py-1  bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <InputGroupAddon className="px-3 py-0 text-rose-400">
                <LockKeyhole className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="text-[15px] placeholder:text-slate-400 "
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <InputGroupButton
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="mr-1 text-slate-400 hover:text-slate-700"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </InputGroupButton>
            </InputGroup>
          </label>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="size-4 rounded border-slate-300" />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-rose-500 underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" variant="default" className="w-full py-5 text-md">
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>

          {errorMessage ? (
            <p className="text-sm text-rose-500" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-500">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="h-auto flex-1 py-3">
              <GoogleIcon />
              Google
            </Button>

            <Button type="button" variant="outline" className="h-auto flex-1 py-3">
              <AppleIcon />
              Apple
            </Button>
          </div>

          <p className="pt-2 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="font-semibold text-rose-500 underline-offset-4 hover:underline"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}
