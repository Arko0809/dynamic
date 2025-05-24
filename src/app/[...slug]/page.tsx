// app/[...slug]/page.tsx
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import { PageData, DrupalResponse } from '@/lib/types'
import dynamic from 'next/dynamic'

// Dynamic imports with SSR enabled for better performance
const HomeLayout = dynamic(() => import('@/components/layouts/HomeLayout'), { ssr: true })
const TVLayout = dynamic(() => import('@/components/layouts/TVLayout'), { ssr: true })
const InternetLayout = dynamic(() => import('@/components/layouts/InternetLayout'), { ssr: true })
const DefaultLayout = dynamic(() => import('@/components/layouts/DefaultLayout'), { ssr: true })

interface DynamicPageProps {
  params: {
    slug: string[]
  }
}

async function getPageData(slug: string[]): Promise<DrupalResponse<PageData> | null> {
  try {
    // Handle root path
    if (!slug || slug.length === 0) {
      slug = ['home']
    }

    const slugPath = slug.join('/')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/pages/${slugPath}`, {
      next: { 
        revalidate: 3600,
        tags: [`page-${slugPath}`]
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      if (slugPath !== 'home') {
        // If not found and not on home page, try to get home page data
        return getPageData(['home'])
      }
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching page data:', error)
    if (slug.join('/') !== 'home') {
      // If error and not on home page, try to get home page data
      return getPageData(['home'])
    }
    return null
  }
}

function LayoutRenderer({ pageData }: { pageData: PageData }) {
  switch (pageData.attributes.field_layout_type) {
    case 'home':
      return <HomeLayout pageData={pageData} />
    case 'tv':
      return <TVLayout pageData={pageData} />
    case 'internet':
      return <InternetLayout pageData={pageData} />
    default:
      return <DefaultLayout pageData={pageData} />
  }
}

export async function generateMetadata({ params }: DynamicPageProps) {
  const { slug } = await params;
  const response = await getPageData(slug)
  
  if (!response || !response.data) {
    return {
      title: 'Page Not Found - EntertainmentCorp'
    }
  }

  const pageData = response.data;
  return {
    title: `${pageData.attributes.title} - EntertainmentCorp`,
    description: pageData.attributes.field_meta_description || pageData.attributes.title,
    keywords: [],
    openGraph: {
      title: `${pageData.attributes.title} - EntertainmentCorp`,
      description: pageData.attributes.field_meta_description || pageData.attributes.title,
    }
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const response = await getPageData(slug)
  
  if (!response || !response.data) {
    notFound()
  }

  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<div className="animate-pulse p-8">Loading page...</div>}>
        <LayoutRenderer pageData={response.data} />
      </Suspense>
    </div>
  )
}

// Generate static params for known routes (optional optimization)
export async function generateStaticParams() {
  const knownRoutes = [
    ['home'],
    ['tv'],
    ['tv', 'maxTv', 'stream'],
    ['tv', 'maxTv', 'equipment'],
    ['tv', 'doEvenMore', 'apps'],
    ['tv', 'doEvenMore', 'deals'],
    ['internet', 'package'],
    ['internet', 'links', 'plans']
  ]

  return knownRoutes.map((slug) => ({
    slug
  }))
}