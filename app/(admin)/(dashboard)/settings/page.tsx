'use client'

import { useState, useEffect } from 'react'
import { getStudioConfig, updateStudioConfig } from '@/lib/service/settingsService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Settings, Clock, Users, Power, Save, Loader2, CheckCircle2 } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState({
    slotDurationMinutes: 90,
    maxCapacityPerSlot: 10,
    isActive: true
  })

  useEffect(() => {
    async function loadSettings() {
      const data = await getStudioConfig()
      if (data) setConfig(data)
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await updateStudioConfig(config)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000) 
    } catch (error) {
      alert("Erreur lors de la sauvegarde")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#B35D89]" /></div>

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#B35D89] rounded-2xl text-white">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Paramètres Open Studio</h1>
          <p className="text-sm text-gray-500">Configurez les règles de réservation</p>
        </div>
      </div>

      <Card className="border-[#EBE3DE] shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-[#FDFBF9] border-b border-[#EBE3DE]">
          <CardTitle className="text-lg flex items-center gap-2">
            <Power size={18} className={config.isActive ? "text-green-500" : "text-red-500"} />
            Statut du Studio
          </CardTitle>
          <CardDescription>Activez ou désactivez les réservations en un clic</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-bold">Système de réservation</Label>
            <p className="text-xs text-gray-400">
              {config.isActive ? "Le studio accepte les réservations" : "Le studio est actuellement fermé"}
            </p>
          </div>
          <Switch 
            checked={config.isActive} 
            onCheckedChange={(val) => setConfig({...config, isActive: val})}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#EBE3DE] rounded-3xl">
          <CardContent className="pt-6 space-y-4">
            <Label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-500">
              <Clock size={14} className="text-[#B35D89]" /> Durée du Créneau
            </Label>
            <div className="flex items-end gap-3">
              <Input 
                type="number" 
                value={config.slotDurationMinutes}
                onChange={(e) => setConfig({...config, slotDurationMinutes: parseInt(e.target.value)})}
                className="rounded-xl border-[#EBE3DE]"
              />
              <span className="text-sm text-gray-400 pb-2">min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#EBE3DE] rounded-3xl">
          <CardContent className="pt-6 space-y-4">
            <Label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-500">
              <Users size={14} className="text-[#B35D89]" /> Capacité Max
            </Label>
            <div className="flex items-end gap-3">
              <Input 
                type="number" 
                value={config.maxCapacityPerSlot}
                onChange={(e) => setConfig({...config, maxCapacityPerSlot: parseInt(e.target.value)})}
                className="rounded-xl border-[#EBE3DE]"
              />
              <span className="text-sm text-gray-400 pb-2">pers.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleSave}
        disabled={saving}
        className="w-full py-6 rounded-full bg-[#B35D89] hover:bg-[#a04e79] text-white font-bold transition-all shadow-lg flex items-center gap-2"
      >
        {saving ? <Loader2 className="animate-spin" size={18} /> : saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
        {saving ? "Sauvegarde..." : saved ? "Config Sauvegardée !" : "Enregistrer les modifications"}
      </Button>
    </div>
  )
}