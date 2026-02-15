'use client'

import { useState } from 'react'
import { signin } from '@/lib/service/authService'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Palette, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      setLoading(false)
      return
    }

    try {
      await signin(email, password)
      router.push('/booking')
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion. Veuillez réessayer.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FCFAFA]">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#b3668a] transition-colors mb-6 w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </Link>

        <Card className="border-none shadow-xl shadow-gray-200/50">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#b3668a] text-white">
              <Palette className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">The Fun Lab</CardTitle>
              <CardDescription>
                Espace d'administration
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@thefunlab.com"
                  className="h-11 focus-visible:ring-[#b3668a]"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 focus-visible:ring-[#b3668a]"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl text-sm animate-in fade-in zoom-in-95">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#b3668a] hover:bg-[#9a5574] text-white h-11 rounded-xl transition-all"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-muted-foreground">
              <p className="uppercase tracking-widest font-medium">Accès restreint</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}