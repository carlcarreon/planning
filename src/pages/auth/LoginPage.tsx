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
