'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

interface NavigationProps {
  items?: NavigationItem[]
  variant?: 'home' | 'tv' | 'internet' | 'default'
  className?: string
}

export default function Navigation({ items, variant = 'default', className }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const variantClasses = {
    home: {
      text: "text-blue-100 hover:text-white",
      dropdown: "bg-blue-800 border-blue-700",
      mobile: "bg-blue-900"
    },
    tv: {
      text: "text-purple-100 hover:text-white", 
      dropdown: "bg-purple-800 border-purple-700",
      mobile: "bg-purple-900"
    },
    internet: {
      text: "text-green-100 hover:text-white",
      dropdown: "bg-green-800 border-green-700", 
      mobile: "bg-green-900"
    },
    default: {
      text: "text-gray-100 hover:text-white",
      dropdown: "bg-gray-800 border-gray-700",
      mobile: "bg-gray-900"
    }
  }

  const defaultItems: NavigationItem[] = [
    { label: 'Home', href: '/home' },
    {
      label: 'TV Services',
      href: '/tv',
      children: [
        { label: 'MaxTV Stream', href: '/tv/maxTv/stream' },
        { label: 'MaxTV Equipment', href: '/tv/maxTv/equipment' },
        { label: 'Apps & Features', href: '/tv/doEvenMore/apps' },
        { label: 'Deals & Offers', href: '/tv/doEvenMore/deals' }
      ]
    },
    {
      label: 'Internet',
      href: '/internet/package',
      children: [
        { label: 'Packages', href: '/internet/package' },
        { label: 'Plans & Pricing', href: '/internet/links/plans' }
      ]
    }
  ]

  const navigationItems = items || defaultItems
  const colors = variantClasses[variant]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setActiveDropdown(null)
  }

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <nav className={className}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navigationItems.map((item) => (
          <div key={item.label} className="relative group">
            {item.children ? (
              <div>
                <button
                  className={cn(
                    "flex items-center space-x-1 transition-colors duration-200",
                    colors.text
                  )}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-56 rounded-lg border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
                    colors.dropdown
                  )}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="py-2">
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors duration-200",
                        colors.text
                      )}
                    >
                      View All {item.label}
                    </Link>
                    <hr className="my-2 border-gray-600" />
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors duration-200",
                          colors.text
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors duration-200",
                  colors.text
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <button
        className={cn("md:hidden p-2 transition-colors", colors.text)}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className={cn(
          "absolute top-full left-0 right-0 border-t shadow-lg md:hidden z-50",
          colors.mobile
        )}>
          <div className="px-6 py-4 space-y-4">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      className={cn(
                        "flex items-center justify-between w-full text-left transition-colors duration-200",
                        colors.text
                      )}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          activeDropdown === item.label ? "rotate-180" : ""
                        )} 
                      />
                    </button>
                    
                    {activeDropdown === item.label && (
                      <div className="mt-2 ml-4 space-y-2">
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-2 text-sm transition-colors duration-200",
                            colors.text
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All {item.label}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block py-2 text-sm transition-colors duration-200",
                              colors.text
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block transition-colors duration-200",
                      colors.text
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}