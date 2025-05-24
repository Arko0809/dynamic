import { PageData, ComponentData } from '@/lib/types';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Navigation from '../ui/Navigation';
import LayoutWrapper from './LayoutWrapper';
import ComponentRenderer from '../content/ComponentRenderer';

interface InternetLayoutProps {
  pageData: PageData;
}

export default function InternetLayout({ pageData }: InternetLayoutProps) {
  const internetNavigation = [
    { label: 'Internet Packages', href: '/internet/package' },
    { label: 'Connection Plans', href: '/internet/links/plans' }
  ];

  return (
    <LayoutWrapper pageData={pageData}>
      <div className="internet-layout">
        <Header variant="internet" />
        <Navigation items={internetNavigation} variant="internet" />
        <main className="pt-32" suppressHydrationWarning>
          <div className="container mx-auto px-4 py-8">
            {pageData.attributes.title && (
              <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                  {pageData.attributes.title}
                </h1>
                {pageData.attributes.field_meta_description && (
                  <p className="text-xl text-green-700 opacity-90">{pageData.attributes.field_meta_description}</p>
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
        <Footer variant="internet" />
      </div>
    </LayoutWrapper>
  );
}
