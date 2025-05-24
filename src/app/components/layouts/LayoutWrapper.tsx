// components/layouts/LayoutWrapper.tsx
'use client'

import { useEffect, useState } from 'react'
import { PageData } from '@/lib/types'

interface LayoutWrapperProps {
  children: React.ReactNode
  pageData: PageData
}

export default function LayoutWrapper({ children, pageData }: LayoutWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-white">
      {children}
    </div>
  )
}