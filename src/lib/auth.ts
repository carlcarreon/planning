import { supabase } from './supabase'

function isEmailIdentifier(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function resolveLoginEmail(identifier: string) {
  const normalizedIdentifier = identifier.trim().toLowerCase()

  if (isEmailIdentifier(normalizedIdentifier)) {
    return normalizedIdentifier
  }

  const { data, error } = await supabase.rpc('find_email_by_username', {
    lookup_username: normalizedIdentifier,
  })

  if (error) {
    throw new Error(error.message)
  }

  const email = typeof data === 'string' ? data.trim().toLowerCase() : ''

  if (!email) {
    throw new Error('No account found for that username.')
  }

  return email
}
