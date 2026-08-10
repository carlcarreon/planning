import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Button } from '../../components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../components/ui/input-group'
import { supabase } from '../../lib/supabase'
import AuthHero from './AuthHero'

type RegisterPageProps = {
  onLogin: () => void
}

export default function RegisterPage({ onLogin }: RegisterPageProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    if (password !== confirmPassword) {
      setIsSubmitting(false)
      setErrorMessage('Passwords do not match.')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: username,
        },
      },
    })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    if (data.session) {
      await supabase.from('profiles').upsert({
        id: data.user?.id,
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        full_name: username.trim(),
      })
      window.history.pushState({}, '', '/checklist')
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }

    setSuccessMessage('Account created.')
  }

  return (
    <section className="w-full space-y-12 px-4 text-left">
      <AuthHero />

      <div className="space-y-6">
        <div className="text-left">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-slate-900">
            Create account
          </h1>
          <p className="text-sm text-slate-500">
            Start your account to save your memories
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Username</span>
            <InputGroup className="h-12 rounded-sm border-slate-200 py-1 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <InputGroupAddon className="px-3 py-0 text-rose-400">
                <UserRound className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Create a username"
                className="text-[15px] placeholder:text-slate-400"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </InputGroup>
          </label>

          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Email</span>
            <InputGroup className="h-12 rounded-sm border-slate-200 py-1 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <InputGroupAddon className="px-3 py-0 text-rose-400">
                <Mail className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                type="email"
                placeholder="Enter your email"
                className="text-[15px] placeholder:text-slate-400"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </InputGroup>
          </label>

          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Password</span>
            <InputGroup className="h-12 rounded-sm border-slate-200 py-1 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <InputGroupAddon className="px-3 py-0 text-rose-400">
                <LockKeyhole className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="text-[15px] placeholder:text-slate-400"
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

          <label className="block space-y-2 text-left">
            <span className="text-sm font-semibold text-slate-900">Confirm password</span>
            <InputGroup className="h-12 rounded-sm border-slate-200 py-1 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <InputGroupAddon className="px-3 py-0 text-rose-400">
                <LockKeyhole className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repeat your password"
                className="text-[15px] placeholder:text-slate-400"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <InputGroupButton
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="mr-1 text-slate-400 hover:text-slate-700"
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </InputGroupButton>
            </InputGroup>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 text-rose-500"
            />
            <span>
              I agree to the{' '}
              <button
                type="button"
                className="font-medium text-rose-500 underline-offset-4 hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                className="font-medium text-rose-500 underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </label>

          <Button type="submit" variant="default" className="w-full py-5 text-sm">
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>

          {errorMessage ? (
            <p className="text-sm text-rose-500" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="text-sm text-emerald-600" role="status">
              {successMessage}
            </p>
          ) : null}

          <p className="pt-2 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              className="font-semibold text-rose-500 underline-offset-4 hover:underline"
              onClick={onLogin}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}
