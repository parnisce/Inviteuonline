import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * Subscribes the component tree to the Supabase auth session.
 * `session` is null while signed out; `loading` is true until the first read.
 */
export default function useSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
        setLoading(false)
      }
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      mounted = false
      data.subscription.unsubscribe()
    }
  }, [])

  return { session, loading, user: session?.user ?? null }
}
