'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { getProfile } from '@/lib/service/profileService'
import { Loader2 } from 'lucide-react'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await getProfile()
          if (profile.role === 'admin') {
            setAuthorized(true)
          } else {
            router.push('/')
          }
        } catch (error) {
          router.push('/login')
        }
      } else {
        router.push('/login') 
      }
    })

    return () => unsubscribe()
  }, [router])

  if (!authorized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#FCFAFA]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#b3668a]" />
          <p className="text-sm text-muted-foreground animate-pulse">Vérification des accès...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}