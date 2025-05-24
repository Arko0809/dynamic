import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Feature {
  id: string
  title: string
  description: string
  icon?: string
  image?: string
  href?: string
}

interface FeatureGridProps {
  title?: string
  features: Feature[]
  variant?: 'home' | 'tv' | 'internet' | 'default'
  columns?: 2 | 3 | 4
  className?: string
}

export default function FeatureGrid({
  title,
  features,
  variant = 'default',
  columns = 3,
  className
}: FeatureGridProps) {
  const variantClasses = {
    home: {
      accent: "text-blue-600",
      border: "border-blue-200 hover:border-blue-300",
      bg: "hover:bg-blue-50"
    },
    tv: {
      accent: "text-purple-600",
      border: "border-purple-200 hover:border-purple-300", 
      bg: "hover:bg-purple-50"
    },
    internet: {
      accent: "text-green-600",
      border: "border-green-200 hover:border-green-300",
      bg: "hover:bg-green-50"
    },
    default: {
      accent: "text-gray-600",
      border: "border-gray-200 hover:border-gray-300",
      bg: "hover:bg-gray-50"
    }
  }

  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  const colors = variantClasses[variant]

  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          </div>
        )}
        
        <div className={cn(
          "grid gap-8",
          gridClasses[columns]
        )}>
          {features.map((feature) => {
            const FeatureCard = (
              <div
                className={cn(
                  "bg-white rounded-xl border-2 p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
                  colors.border,
                  colors.bg,
                  feature.href ? "cursor-pointer" : ""
                )}
              >
                {feature.image && (
                  <div className="mb-6">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {feature.icon && (
                  <div className={cn("text-4xl mb-4", colors.accent)}>
                    {feature.icon}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )

            return feature.href ? (
              <Link key={feature.id} href={feature.href}>
                {FeatureCard}
              </Link>
            ) : (
              <div key={feature.id}>
                {FeatureCard}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}