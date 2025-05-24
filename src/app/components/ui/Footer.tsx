import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  variant?: 'home' | 'tv' | 'internet' | 'default'
  sections?: FooterSection[]
  className?: string
}

export default function Footer({ variant = 'default', sections, className }: FooterProps) {
  const variantClasses = {
    home: "bg-blue-900 text-blue-100",
    tv: "bg-purple-900 text-purple-100", 
    internet: "bg-green-900 text-green-100",
    default: "bg-gray-900 text-gray-100"
  }

  const linkHoverClasses = {
    home: "hover:text-blue-300",
    tv: "hover:text-purple-300",
    internet: "hover:text-green-300", 
    default: "hover:text-gray-300"
  }

  const defaultSections: FooterSection[] = [
    {
      title: 'TV Services',
      links: [
        { label: 'MaxTV Stream', href: '/tv/maxTv/stream' },
        { label: 'MaxTV Equipment', href: '/tv/maxTv/equipment' },
        { label: 'Apps & Features', href: '/tv/doEvenMore/apps' },
        { label: 'Deals & Offers', href: '/tv/doEvenMore/deals' }
      ]
    },
    {
      title: 'Internet Services', 
      links: [
        { label: 'Internet Packages', href: '/internet/package' },
        { label: 'Plans & Pricing', href: '/internet/links/plans' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
        { label: 'Careers', href: '/careers' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' }
      ]
    }
  ]

  const footerSections = sections || defaultSections

  return (
    <footer className={cn(variantClasses[variant], className)}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/home" className="text-2xl font-bold mb-4 block">
              EntertainmentCorp
            </Link>
            <p className="text-sm opacity-80 mb-6">
              Delivering premium entertainment and internet services to homes and businesses nationwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={cn("opacity-60 transition-opacity", linkHoverClasses[variant])} aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={cn("opacity-60 transition-opacity", linkHoverClasses[variant])} aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className={cn("opacity-60 transition-opacity", linkHoverClasses[variant])} aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986C18.635 23.973 24.002 18.605 24.002 11.987 24.002 5.367 18.635.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.458 0 4.467 2.01 4.467 4.468s-2.009 4.468-4.467 4.468zm7.519 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.458 0 4.467 2.01 4.467 4.468s-2.009 4.468-4.467 4.468z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className={cn("text-sm opacity-80 transition-all", linkHoverClasses[variant])}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-60 mb-4 md:mb-0">
            © {new Date().getFullYear()} EntertainmentCorp. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className={cn("opacity-60 transition-all", linkHoverClasses[variant])}>
              Privacy
            </Link>
            <Link href="/terms" className={cn("opacity-60 transition-all", linkHoverClasses[variant])}>
              Terms
            </Link>
            <Link href="/cookies" className={cn("opacity-60 transition-all", linkHoverClasses[variant])}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}