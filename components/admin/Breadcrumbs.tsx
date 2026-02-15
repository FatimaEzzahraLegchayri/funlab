'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter((segment) => segment !== '')
  
    return (
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground mb-0">
        <Link 
          href="/booking" 
          className="hover:text-[#b3668a] transition-colors flex items-center gap-1"
        >
          <Home className="h-4 w-4 text-[#b3668a]" />
        </Link>
  
        {pathSegments.map((segment, index) => {
          if (segment.toLowerCase() === 'admin' && index === 0) return null;
  
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
  
          return (
            <div key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 opacity-50" />
              {isLast ? (
                <span className="font-semibold text-[#1A1A1A]">{label}</span>
              ) : (
                <Link 
                  href={href} 
                  className="hover:text-[#b3668a] transition-colors"
                >
                  {label}
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    )
  }