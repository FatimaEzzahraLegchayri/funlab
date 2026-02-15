'use client'

import { 
  LayoutDashboard, Palette, CalendarDays, UserCircle, Settings, Grid, LogOut 
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent, SidebarRail,
} from "@/components/ui/sidebar"
import { ConfirmLogoutModal } from "@/components/modals/ConfirmLogoutModal"
import { logout } from "@/lib/service/authService" 
import { useRouter } from "next/navigation"
import { useState } from "react"

const navItems = [
  { title: "Réservations", icon: CalendarDays, url: "/booking" },
  { title: "Ateliers", url: "/workshops", icon: Grid },
  { title: "Paramètres", url: "/settings", icon: Settings },
  { title: "Profil", url: "/profile", icon: UserCircle },
]

export function DashSidebar() {
  const pathname = usePathname()

  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()

  const handleLogoutConfirm = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <>
    <Sidebar collapsible="icon" className="border-r border-gray-100 bg-[#FDFCFB]">
      <SidebarHeader className="h-14 flex items-center px-4 border-b border-gray-100">
        <div className="flex items-center gap-3 w-full">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#b3668a] text-white">
            <Palette className="h-5 w-5" />
          </div>
          <span className="font-bold text-[#1A1A1A] text-lg group-data-[collapsible=icon]:hidden tracking-tight">
            The Fun Lab
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`h-11 px-3 rounded-xl transition-all ${
                        isActive ? "bg-[#F5F0F2] text-[#b3668a]" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon className={isActive ? "text-[#b3668a]" : "text-gray-500"} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-gray-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="h-11 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="size-5" />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <ConfirmLogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </>
  )
}