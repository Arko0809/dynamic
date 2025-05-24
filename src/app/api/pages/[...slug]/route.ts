// app/api/pages/[...slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { pathToFileName } from '@/lib/utils';
import { DrupalResponse, PageData } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const paramsValue = await params;
    const { slug } = paramsValue;
    const pagePath = '/' + (slug || []).join('/');
    
    // Handle root path
    const effectivePath = pagePath === '/' ? '/home' : pagePath;
    
    // Convert path to filename
    const fileName = pathToFileName(effectivePath);
    
    // Construct file path - ensure data/pages directory exists
    const pagesDir = path.join(process.cwd(), 'data', 'pages');
    try {
      await fs.mkdir(pagesDir, { recursive: true });
    } catch (err) {
      console.error('Error creating pages directory:', err);
    }
    
    const filePath = path.join(pagesDir, `${fileName}.json`);
    
    // Check if file exists and read it
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const pageData: DrupalResponse<PageData> = JSON.parse(fileContent);
      
      pageData.meta = {
        ...pageData.meta,
        requested_path: pagePath
      };
      
      return NextResponse.json(pageData, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
        }
      });
      
    } catch (fileError) {
      // If home page is requested but not found, create it
      if (effectivePath === '/home') {
        const defaultHomeData = {
          jsonapi: { version: '1.0' },
          data: {
            type: 'page',
            id: 'home',
            attributes: {
              title: 'Welcome to EntertainmentCorp',
              field_layout_type: 'home',
              field_meta_description: 'Your one-stop destination for TV and Internet services',
              field_components: []
            }
          }
        };
        
        try {
          await fs.writeFile(filePath, JSON.stringify(defaultHomeData, null, 2));
          return NextResponse.json(defaultHomeData, {
            status: 200,
            headers: {
              'Content-Type': 'application/vnd.api+json',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        } catch (writeError) {
          console.error('Error creating home page:', writeError);
        }
      }
      
      // File not found, return 404
      return NextResponse.json(
        {
          jsonapi: { version: '1.0' },
          errors: [
            {
              status: '404',
              title: 'Page Not Found',
              detail: `The requested page "${pagePath}" could not be found.`,
              source: { parameter: 'slug' }
            }
          ]
        },
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/vnd.api+json'
          }
        }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      {
        jsonapi: { version: '1.0' },
        errors: [
          {
            status: '500',
            title: 'Internal Server Error',
            detail: 'An unexpected error occurred while processing the request.'
          }
        ]
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      }
    );
  }
}

// Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}