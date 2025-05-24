import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingPlan {
  id: string
  name: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  ctaButton: {
    text: string
    href: string
  }
  popular?: boolean
}

interface PricingTableProps {
  title?: string
  subtitle?: string
  plans: PricingPlan[]
  variant?: 'home' | 'tv' | 'internet' | 'default'
  className?: string
}

export default function PricingTable({
  title,
  subtitle,
  plans,
  variant = 'default',
  className
}: PricingTableProps) {
  const variantClasses = {
    home: {
      accent: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: "border-blue-500 bg-blue-50"
    },
    tv: {
      accent: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700 text-white",
      popular: "border-purple-500 bg-purple-50"
    },
    internet: {
      accent: "text-green-600", 
      button: "bg-green-600 hover:bg-green-700 text-white",
      popular: "border-green-500 bg-green-50"
    },
    default: {
      accent: "text-gray-600",
      button: "bg-gray-600 hover:bg-gray-700 text-white",
      popular: "border-gray-500 bg-gray-50"
    }
  }

  const colors = variantClasses[variant]

  return (
    <section className={cn("py-16 px-6 bg-gray-50", className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(
          "grid gap-8",
          plans.length === 1 ? "grid-cols-1 max-w-md mx-auto" :
          plans.length === 2 ? "grid-cols-1 md:grid-cols-2" :
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "bg-white rounded-xl border-2 p-8 relative transition-all duration-300 hover:shadow-lg",
                plan.popular 
                  ? cn(colors.popular, "scale-105")
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              {plan.popular && (
                <div className={cn(
                  "absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white",
                  colors.button
                )}>
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={cn("text-5xl font-bold", colors.accent)}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 text-lg">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    {feature.included ? (
                      <Check className={cn("w-5 h-5 mr-3", colors.accent)} />
                    ) : (
                      <X className="w-5 h-5 mr-3 text-gray-400" />
                    )}
                    <span className={cn(
                      feature.included ? "text-gray-900" : "text-gray-500"
                    )}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <Link
                href={plan.ctaButton.href}
                className={cn(
                  "w-full block text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
                  colors.button
                )}
              >
                {plan.ctaButton.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}