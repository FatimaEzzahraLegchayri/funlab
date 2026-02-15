'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, User, Mail, ShieldCheck, Calendar, Edit3 } from 'lucide-react'
import { getProfile } from '@/lib/service/profileService'
import { UpdateProfileModal } from '@/components/modals/UpdateProfileModal'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await getProfile()
      console.log("data",data)
      setProfile(data)
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erreur", description: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#b3668a]" /></div>

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-[#b3668a] text-white p-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{profile?.name || 'Administrateur'}</CardTitle>
              <CardDescription className="text-pink-100 flex items-center gap-1">
                <ShieldCheck className="size-4" /> Role: {profile?.role || 'Admin'}
              </CardDescription>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 border-none text-white gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Edit3 className="size-4" /> Modifier
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <InfoItem icon={<User />} label="Nom Complet" value={profile?.name} />
            <InfoItem icon={<Mail />} label="Email" value={profile?.email} />
            <InfoItem 
              icon={<Calendar />} 
              label="Membre depuis" 
              value={profile?.createdAt ? format(new Date(profile.createdAt), 'dd MMMM yyyy') : 'N/A'} 
            />
          </div>
        </CardContent>
      </Card>

      <UpdateProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentName={profile?.name}
        onSuccess={fetchProfile}
      />
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="size-10 rounded-full bg-[#F5F0F2] text-[#b3668a] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
        <span className="text-sm font-semibold text-gray-800">{value || 'Non renseigné'}</span>
      </div>
    </div>
  )
}