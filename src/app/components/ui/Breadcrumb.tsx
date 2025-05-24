import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  variant?: 'home' | 'tv' | 'internet' | 'default'
  className?: string
}

export default function Breadcrumb({ items, variant = 'default', className }: BreadcrumbProps) {
  const variantClasses = {
    home: "text-blue-600",
    tv: "text-purple-600", 
    internet: "text-green-600",
    default: "text-gray-600"
  }

  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)} aria-label="Breadcrumb">
      <Link 
        href="/home" 
        className={cn("flex items-center hover:underline transition-colors", variantClasses[variant])}
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link 
              href={item.href}
              className={cn("hover:underline transition-colors", variantClasses[variant])}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}