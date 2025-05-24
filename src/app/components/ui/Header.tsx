'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import Navigation from './Navigation'

interface HeaderProps {
  variant: 'home' | 'tv' | 'internet' | 'default'
  className?: string
}

export default function Header({ variant, className }: HeaderProps) {
  const baseClasses = "fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-sm"
  
  const variantClasses = {
    home: "bg-blue-900/90 text-white",
    tv: "bg-purple-900/90 text-white",
    internet: "bg-green-900/90 text-white",
    default: "bg-gray-900/90 text-white"
  }

  return (
    <header className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/home" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          EntertainmentCorp
        </Link>
        
        <Navigation variant={variant} />
      </div>
    </header>
  )
}