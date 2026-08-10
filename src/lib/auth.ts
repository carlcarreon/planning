import { supabase } from './supabase'

function isEmailIdentifier(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function resolveLoginEmail(identifier: string) {
  const normalizedIdentifier = identifier.trim().toLowerCase()

  if (isEmailIdentifier(normalizedIdentifier)) {
    return normalizedIdentifier
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', normalizedIdentifier)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  const email = data?.email?.trim()

  if (!email) {
    throw new Error('No account found for that username.')
  }

  return email
}
