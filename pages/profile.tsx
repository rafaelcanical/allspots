import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import { User } from '@supabase/supabase-js'

export default function Profile() {
  // Local state
  const [profile, setProfile] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  /**
   * Fetch profile
   */
  async function fetchProfile() {
    const profileData = await supabase.auth.user()
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }

  /**
   * Sign out user
   */
  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  if (!profile) return null

  return (
    <div>
      <h1>user logged in</h1>
      <p>
        #{profile.id} {profile.email}
      </p>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
