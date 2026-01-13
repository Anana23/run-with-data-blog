import { getSession } from './auth.js'

export async function requireAuth(redirect = '/login.html') {
  const session = await getSession()

  if (!session) {
    window.location.href = redirect
  }

  return session
}
