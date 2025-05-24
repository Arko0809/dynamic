import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  ctaButton?: {
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  backgroundImage?: string
  variant?: 'home' | 'tv' | 'internet' | 'default'
  className?: string
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaButton,
  backgroundImage,
  variant = 'default',
  className
}: HeroSectionProps) {
  const variantClasses = {
    home: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700",
    tv: "bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700",
    internet: "bg-gradient-to-br from-green-900 via-green-800 to-green-700",
    default: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
  }

  const buttonVariants = {
    primary: {
      home: "bg-blue-600 hover:bg-blue-700 text-white",
      tv: "bg-purple-600 hover:bg-purple-700 text-white",
      internet: "bg-green-600 hover:bg-green-700 text-white",
      default: "bg-gray-600 hover:bg-gray-700 text-white"
    },
    secondary: "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
  }

  return (
    <section 
      className={cn(
        "relative py-24 px-6 text-white overflow-hidden",
        variantClasses[variant],
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          {subtitle && (
            <p className="text-lg font-medium mb-4 opacity-90">
              {subtitle}
            </p>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {description}
            </p>
          )}
          
          {ctaButton && (
            <Link
              href={ctaButton.href}
              className={cn(
                "inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105",
                ctaButton.variant === 'secondary' 
                  ? buttonVariants.secondary
                  : buttonVariants.primary[variant]
              )}
            >
              {ctaButton.text}
            </Link>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full blur-2xl"></div>
    </section>
  )
}