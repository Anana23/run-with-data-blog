import { supabase } from './supabase.js'

export async function signUp(email, password) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://run-with-data.com/verify.html'
    }
  })
}

export async function login(email, password) {
  return supabase.auth.signInWithPassword({
    email,
    password
  })
}

export async function logout() {
  return supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}
