// components/layouts/HomeLayout.tsx
'use client'

import { Suspense } from 'react'
import { PageData, ComponentData } from '@/lib/types'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import LayoutWrapper from './LayoutWrapper'
import ComponentRenderer from '../content/ComponentRenderer'

interface HomeLayoutProps {
  pageData: PageData;
}

export default function HomeLayout({ pageData }: HomeLayoutProps) {
  if (!pageData || !pageData.attributes) {
    return null;
  }

  return (
    <LayoutWrapper pageData={pageData}>
      <div className="flex flex-col min-h-screen">
        <Header variant="home" />
        <main className="flex-grow">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative container mx-auto px-4 py-20 sm:py-24 lg:py-32">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  {pageData.attributes.title || 'Welcome'}
                </h1>
                {pageData.attributes.field_meta_description && (
                  <p className="mt-6 text-xl sm:text-2xl max-w-2xl mx-auto opacity-90">
                    {pageData.attributes.field_meta_description}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <Suspense 
              fallback={
                <div className="space-y-8">
                  <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
                  <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
                </div>
              }
            >
              <div className="grid gap-12">
                {pageData.attributes.field_components?.map((component: ComponentData, index: number) => (
                  <div 
                    key={`${component.type || 'component'}-${index}`}
                    className="component-wrapper animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ComponentRenderer component={component} />
                  </div>
                ))}
              </div>
            </Suspense>
          </div>
        </main>
        <Footer variant="home" />
      </div>
    </LayoutWrapper>
  )
}

// Make sure to update other layout components similarly:
// TVLayout.tsx, InternetLayout.tsx, DefaultLayout.tsx