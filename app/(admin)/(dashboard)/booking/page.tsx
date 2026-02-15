'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkshopTable } from '@/components/admin/bookings/workshopTable'
import { OpenStudioTable } from '@/components/admin/bookings/openStudioTable'

export default function BookingPage() {
  return (
    <div className="flex min-h-screen bg-[#FCFAFA]">
      <main className="flex-1 md:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
              Réservations
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Gérez les inscriptions aux ateliers, aux événements spéciaux et aux demandes d'entreprises.
            </p>
          </div>

          <Tabs defaultValue="workshops" className="w-full">
            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <TabsList className="grid w-full max-w-full md:max-w-[600px] grid-cols-2 mb-4 md:mb-8">
                <TabsTrigger 
                  className="cursor-pointer py-2.5 text-sm md:text-base data-[state=active]:text-[#b3668a]" 
                  value="workshops"
                >
                  Ateliers
                </TabsTrigger>
                <TabsTrigger 
                  className="cursor-pointer py-2.5 text-sm md:text-base data-[state=active]:text-[#b3668a]" 
                  value="open-studio"
                >
                  Open Studio
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="workshops" className="space-y-4 focus-visible:outline-none">
              <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden overflow-x-auto">
                <WorkshopTable />
              </div>
            </TabsContent>

            <TabsContent value="open-studio" className="space-y-4 focus-visible:outline-none">
              <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden overflow-x-auto">
                <OpenStudioTable />
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  )
}