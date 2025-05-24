// components/layouts/DefaultLayout.tsx
'use client'

import { PageData, ComponentData } from '@/lib/types';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import LayoutWrapper from './LayoutWrapper';
import ComponentRenderer from '../content/ComponentRenderer';

interface DefaultLayoutProps {
  pageData: PageData;
}

export default function DefaultLayout({ pageData }: DefaultLayoutProps) {
  return (
    <LayoutWrapper pageData={pageData}>
      <div className="default-layout">
        <Header variant="default" />
        <main className="pt-16" suppressHydrationWarning>
          <div className="container mx-auto px-4 py-8">
            {pageData.attributes.title && (
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {pageData.attributes.title}
                </h1>
              </div>
            )}
            {pageData.attributes.field_components?.map((component: ComponentData, index: number) => (
              <div key={`${component.type}-${index}`} className="mb-8">
                <ComponentRenderer component={component} />
              </div>
            ))}
          </div>
        </main>
        <Footer variant="default" />
      </div>
    </LayoutWrapper>
  );
}