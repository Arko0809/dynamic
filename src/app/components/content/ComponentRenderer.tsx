// components/content/ComponentRenderer.tsx
'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ComponentData, FeatureItem } from '@/lib/types'

// Dynamically import components to prevent hydration issues
const FeatureGrid = dynamic(() => import('./FeatureGrid'), { ssr: true })
const ContentBlock = dynamic(() => import('./ContentBlock'), { ssr: true })
const HeroSection = dynamic(() => import('./HeroSection'), { ssr: true })
const PricingTable = dynamic(() => import('./PricingTable'), { ssr: true })

export default function ComponentRenderer({ component }: { component: ComponentData }) {
  if (!component || !component.attributes) {
    console.warn('Invalid component data:', component);
    return null;
  }

  // Get the component type from either component_type or type field
  const componentType = component.attributes.component_type || 
    (component.type && component.type.includes('--') ? component.type.split('--')[1] : component.type);
  
  if (!componentType) {
    console.warn('Component type not found:', component);
    return null;
  }

  const renderComponent = () => {
    try {
      switch (componentType) {
        case 'feature_grid': {
          const features = (component.attributes.field_features || []).map((f: FeatureItem, i: number) => ({
            ...f,
            id: f.title ? `${f.title.replace(/\s+/g, '-').toLowerCase()}-${i}` : `feature-${i}`
          }))
          return (
            <FeatureGrid
              title={component.attributes.title}
              features={features}
              columns={component.attributes.settings?.columns || 3}
              variant={component.attributes.settings?.variant || 'default'}
            />
          )
        }
        case 'content_blocks':
          return (component.attributes.field_content_blocks || []).map((block, i) => (
            <ContentBlock key={i} {...block} />
          ))
        case 'hero':
        case 'hero_section':
          return (
            <HeroSection
              title={component.attributes.field_hero_title || ''}
              subtitle={component.attributes.field_hero_subtitle}
              backgroundImage={component.attributes.field_hero_image}
              variant={component.attributes.settings?.variant || 'default'}
            />
          )
        case 'pricing_table': {
          const plans = (component.attributes.field_pricing_plans || []).map((p, i) => ({
            id: p.name ? `${p.name.replace(/\s+/g, '-').toLowerCase()}-${i}` : `plan-${i}`,
            name: p.name,
            price: p.price,
            period: (p as { period?: string }).period,
            description: (p as { description?: string }).description || '',
            features: (p.features || []).map((f: string) => ({ name: f, included: true })),
            ctaButton: {
              text: (p as { cta_text?: string }).cta_text || 'Select',
              href: (p as { cta_url?: string }).cta_url || '#'
            },
            popular: (p as { highlighted?: boolean }).highlighted || false
          }))
          return (
            <PricingTable
              title={component.attributes.title}
              plans={plans}
              variant={component.attributes.settings?.variant || 'default'}
            />
          )
        }
        default:
          console.warn(`Unknown component type: ${componentType}`);
          return null;
      }
    } catch (error) {
      console.error('Error rendering component:', error, component);
      return null;
    }
  }

  return (
    <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>}>
      {renderComponent()}
    </Suspense>
  )
}
