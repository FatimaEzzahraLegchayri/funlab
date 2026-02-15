'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Loader2, Mail, Phone, ExternalLink, Ticket } from 'lucide-react'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getWorkshopBookings, updateWorkshopBookingStatus } from '@/lib/service/bookingService'
import { PaginationHelper } from '@/components/admin/paginationHelper'
import { toast } from '@/hooks/use-toast'

interface Booking {
  id: string    
  workshopId: string
  workshopTitle: string
  name: string
  email: string
  phone: string
  count: number 
  paymentProofUrl: string
  createdAt: string
  status: 'pending' | 'confirmed' | 'canceled'
}

export function WorkshopTable() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  const currentBookings = bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const data = await getWorkshopBookings()
        setBookings(data as Booking[])
      } catch (err) {
        setError('Impossible de charger les réservations.')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    // Optimistic update
    const previousBookings = [...bookings]
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))

    try {
      await updateWorkshopBookingStatus(bookingId, newStatus)
      toast({
        title: "Statut mis à jour",
        description: `La réservation est maintenant : ${newStatus}`,
      })
    } catch (err) {
      setBookings(previousBookings)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la mise à jour du statut.",
      })
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
              <TableHead>Participant</TableHead>
              <TableHead>Atelier</TableHead>
              <TableHead>Places</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Date d'inscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.name}
                </TableCell>
                <TableCell className="text-sm font-semibold text-primary">
                  {booking.workshopTitle}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex w-fit items-center gap-1">
                    <Ticket className="h-3 w-3" /> {booking.count}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={booking.status || 'pending'}
                    onValueChange={(value: Booking['status']) => handleStatusChange(booking.id, value)}
                  >
                    <SelectTrigger className={`w-[130px] h-8 text-xs capitalize cursor-pointer ${getStatusClasses(booking.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="cursor-pointer" value="pending">En attente</SelectItem>
                      <SelectItem className="cursor-pointer" value="confirmed">Confirmé</SelectItem>
                      <SelectItem className="cursor-pointer" value="canceled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs text-muted-foreground gap-1">
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {booking.email}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {booking.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <a 
                    href={booking.paymentProofUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    Voir reçu <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {booking.createdAt ? format(new Date(booking.createdAt), 'dd/MM/yyyy HH:mm') : 'N/A'}
                </TableCell>
              </TableRow>
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