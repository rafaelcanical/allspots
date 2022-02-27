import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)

      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('profile')
      }

      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })

    checkUser()

    return () => {
      if (authListener) {
        authListener.unsubscribe()
      }
    }
  }, [])

  /**
   * Request API to handle user auth change
   */
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session })
    })
  }

  /**
   * Check if users is signed in
   */
  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }

  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        {authenticatedState === 'not-authenticated' && (
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        )}
        <Link href="/protected">
          <a>Protected</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
