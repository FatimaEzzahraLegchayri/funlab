'use client'

import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Loader2, 
  Mail, 
  Phone, 
  ExternalLink, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Clock,
  Calendar 
} from 'lucide-react'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getOpenStudioBookings, updateOpenStudioStatus } from '@/lib/service/bookingService'
import { PaginationHelper } from '@/components/admin/paginationHelper'
import { toast } from '@/hooks/use-toast'

export function OpenStudioTable() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  const currentBookings = bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getOpenStudioBookings()
      setBookings(data)
    } catch (err) {
      toast({ variant: "destructive", title: "Erreur", description: "Chargement échoué" })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const prev = [...bookings]
    setBookings(prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
    try {
      await updateOpenStudioStatus(bookingId, newStatus)
      toast({ title: "Succès", description: "Statut mis à jour" })
    } catch (err) {
      setBookings(prev)
      toast({ variant: "destructive", title: "Erreur", description: "Mise à jour échouée" })
    }
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-300'
      case 'canceled': return 'bg-red-100 text-red-700 border-red-300'
      default: return 'bg-white text-gray-800 border-gray-300'
    }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>

  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Date & Créneau</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Personnes</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <TableRow 
                  key={booking.id} 
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => setExpandedRow(expandedRow === booking.id ? null : booking.id)}
                >
                  <TableCell>
                    {expandedRow === booking.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {booking.date}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {booking.startTime} - {booking.endTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs gap-0.5">
                      <span className="font-medium">{booking.phone}</span>
                      <span className="text-muted-foreground italic">Cliquer pour détails</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" /> {booking.personCount}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={booking.status || 'pending'}
                      onValueChange={(val) => handleStatusChange(booking.id, val)}
                    >
                      <SelectTrigger className={`w-[120px] h-8 text-xs cursor-pointer ${getStatusClasses(booking.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="pending">En attente</SelectItem>
                        <SelectItem className="cursor-pointer" value="confirmed">Confirmé</SelectItem>
                        <SelectItem className="cursor-pointer" value="canceled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <a href={booking.paymentProofUrl} target="_blank" className="text-blue-600">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </TableCell>
                </TableRow>

                {expandedRow === booking.id && (
                  <TableRow className="bg-muted/20">
                    <TableCell colSpan={6} className="p-4">
                      <div className="bg-white rounded-lg border p-4 space-y-3 shadow-sm">
                        <h4 className="text-sm font-bold border-b pb-2">Détails des Participants</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {booking.participants?.map((p: any) => (
                            <div key={p.id} className="text-xs flex flex-col gap-1 p-2 bg-muted/30 rounded">
                              <span className="font-semibold text-primary">Participant {p.id}: {p.ageGroup}</span>
                              <span>Activité: {p.activity === 'Other' ? p.customActivity : p.activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 border-t pt-4">
        <PaginationHelper
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  )
}