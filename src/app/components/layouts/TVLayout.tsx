// components/layouts/TVLayout.tsx
'use client'

import { PageData, ComponentData } from '@/lib/types';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Navigation from '../ui/Navigation';
import LayoutWrapper from './LayoutWrapper';
import ComponentRenderer from '../content/ComponentRenderer';

interface TVLayoutProps {
  pageData: PageData;
}

export default function TVLayout({ pageData }: TVLayoutProps) {
  const tvNavigation = [
    { label: 'Max TV Stream', href: '/tv/maxTv/stream' },
    { label: 'Max TV Equipment', href: '/tv/maxTv/equipment' },
    { label: 'Do Even More Apps', href: '/tv/doEvenMore/apps' },
    { label: 'Do Even More Deals', href: '/tv/doEvenMore/deals' },
  ];

  return (
    <LayoutWrapper pageData={pageData}>
      <div className="tv-layout">
        <Header variant="tv" />
        <Navigation items={tvNavigation} variant="tv" />
        <main className="pt-24" suppressHydrationWarning>
          <div className="container mx-auto px-4 py-8">
            {pageData.attributes.title && (
              <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                  {pageData.attributes.title}
                </h1>
                {pageData.attributes.field_meta_description && (
                  <p className="text-xl text-blue-700 opacity-90">{pageData.attributes.field_meta_description}</p>
                )}
              </div>
            )}
            {pageData.attributes.field_components?.map((component: ComponentData, index: number) => (
              <div key={`${component.type}-${index}`} className="mb-8">
                <ComponentRenderer component={component} />
              </div>
            ))}
          </div>
        </main>
        <Footer variant="tv" />
      </div>
    </LayoutWrapper>
  );
}