"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaginationHelper } from "@/components/admin/paginationHelper"; 
import Image from "next/image";

import { AddWorkshopModal } from "@/components/modals/addWorkshopModal";
import { DeleteConfirmationModal } from "@/components/modals/deleteConfirmationModal";
import { getWorkshops, deleteWorkshop } from "@/lib/service/workshopService";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshopToDelete, setWorkshopToDelete] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentWorkshops = workshops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(workshops.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const data = await getWorkshops(); 
      setWorkshops(data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleEdit = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  }; 
  
  const openDeleteModal = (workshop: any) => {
    setWorkshopToDelete(workshop);
  };

  const confirmDelete = async () => {
    if (!workshopToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteWorkshop(workshopToDelete.id);
      setWorkshops((prev) => prev.filter((w) => w.id !== workshopToDelete.id));
      toast({
        title: "Atelier supprimé",
        description: "L'atelier a été retiré avec succès.",
      });
      setWorkshopToDelete(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer l'atelier.",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-7xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Gestion des Ateliers</h1>
          <p className="text-muted-foreground">Créez, modifiez et gérez vos sessions créatives.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvel Atelier
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : workshops.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
          <p className="text-muted-foreground">Aucun atelier pour le moment.</p>
        </div>
      ) : (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Atelier</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Places</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentWorkshops.map((workshop) => (
                  <TableRow key={workshop.id}>
                    <TableCell>
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={workshop.image || '/placeholder-workshop.jpg'}
                          alt={workshop.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-sm line-clamp-1">{workshop.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs gap-1">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Calendar className="h-3 w-3" /> {formatDate(workshop.date)}
                        </span>
                        <span className="text-muted-foreground">
                          {workshop.startTime} - {workshop.endTime}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">
                          {workshop.bookedSeats || 0} / {workshop.capacity}
                        </span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.min(100, ((workshop.bookedSeats || 0) / workshop.capacity) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {workshop.price} MAD
                    </TableCell>
                    <TableCell>
                      <Badge className={workshop.status === 'published' ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-100"}>
                        {workshop.status === 'published' ? 'En ligne' : 'Brouillon'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full cursor-pointer"
                          onClick={() => handleEdit(workshop)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          onClick={() => openDeleteModal(workshop)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 pt-6 border-t">
            <PaginationHelper 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Card>
      )}

      <AddWorkshopModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedWorkshop(null); 
        }} 
        workshopToEdit={selectedWorkshop}
        onSuccess={fetchWorkshops} 
      />

      <DeleteConfirmationModal
        isOpen={!!workshopToDelete}
        onClose={() => setWorkshopToDelete(null)}
        onConfirm={confirmDelete}
        title={workshopToDelete?.title || ""}
        loading={deleteLoading}
      />
    </div>
  );
}