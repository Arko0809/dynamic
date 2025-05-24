import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ContentBlockProps {
  title?: string
  subtitle?: string
  content: string
  image?: string
  imagePosition?: 'left' | 'right' | 'top' | 'bottom'
  ctaButton?: {
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  variant?: 'home' | 'tv' | 'internet' | 'default'
  backgroundColor?: 'white' | 'gray' | 'transparent'
  className?: string
}

export default function ContentBlock({
  title,
  subtitle,
  content,
  image,
  imagePosition = 'right',
  ctaButton,
  variant = 'default',
  backgroundColor = 'white',
  className
}: ContentBlockProps) {
  const variantClasses = {
    home: {
      accent: "text-blue-600",
      button: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
      }
    },
    tv: {
      accent: "text-purple-600",
      button: {
        primary: "bg-purple-600 hover:bg-purple-700 text-white",
        secondary: "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
      }
    },
    internet: {
      accent: "text-green-600",
      button: {
        primary: "bg-green-600 hover:bg-green-700 text-white", 
        secondary: "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
      }
    },
    default: {
      accent: "text-gray-600",
      button: {
        primary: "bg-gray-600 hover:bg-gray-700 text-white",
        secondary: "border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
      }
    }
  }

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "bg-transparent"
  }

  const colors = variantClasses[variant]

  const isHorizontal = imagePosition === 'left' || imagePosition === 'right'
  const isImageFirst = imagePosition === 'left' || imagePosition === 'top'

  const ContentSection = (
    <div className={cn(
      "flex flex-col justify-center",
      isHorizontal ? "lg:w-1/2" : "w-full"
    )}>
      {subtitle && (
        <p className={cn("text-sm font-semibold uppercase tracking-wider mb-2", colors.accent)}>
          {subtitle}
        </p>
      )}
      
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
      )}
      
      <div 
        className="text-gray-600 leading-relaxed mb-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {ctaButton && (
        <div>
          <Link
            href={ctaButton.href}
            className={cn(
              "inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-200 border-2",
              ctaButton.variant === 'secondary'
                ? cn("bg-transparent", colors.button.secondary)
                : colors.button.primary
            )}
          >
            {ctaButton.text}
          </Link>
        </div>
      )}
    </div>
  )

  const ImageSection = image && (
    <div className={cn(
      "flex-shrink-0",
      isHorizontal ? "lg:w-1/2" : "w-full"
    )}>
      <img
        src={image}
        alt={title || 'Content image'}
        className={cn(
          "w-full object-cover rounded-lg",
          isHorizontal ? "h-96 lg:h-full" : "h-64 md:h-96"
        )}
      />
    </div>
  )

  return (
    <section className={cn(
      "py-16 px-6",
      backgroundClasses[backgroundColor],
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "flex gap-12 items-center",
          isHorizontal
            ? "flex-col lg:flex-row"
            : "flex-col",
          isImageFirst && isHorizontal ? "lg:flex-row-reverse" : "",
          isImageFirst && !isHorizontal ? "flex-col-reverse" : ""
        )}>
          {isImageFirst ? (
            <>
              {ImageSection}
              {ContentSection}
            </>
          ) : (
            <>
              {ContentSection}
              {ImageSection}
            </>
          )}
        </div>
      </div>
    </section>
  )
}