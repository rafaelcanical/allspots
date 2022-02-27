import { useState } from 'react'
import { supabase } from '../client'

export default function SignIn() {
  // Local state
  const [email, setEmail] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  /**
   * Sign in form
   */
  async function signIn() {
    if (!email) return

    const { error } = await supabase.auth.signIn({ email })

    if (error) {
      console.log(error)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div>
        <h1>Please check your email to sign in.</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Sign in</h1>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}
