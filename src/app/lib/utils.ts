// lib/utils.ts

import { BreadcrumbItem } from './types';

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugToPath(slug: string[]): string {
  return '/' + slug.join('/');
}

export function pathToSlug(path: string): string[] {
  return path.split('/').filter(Boolean);
}

export function pathToFileName(path: string): string {
  const slug = path.split('/').filter(Boolean);
  return slug.join('-') || 'home';
}

export function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', url: '/home' }
  ];

  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    currentPath += '/' + segments[i];
    const title = segments[i]
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      title,
      url: i === segments.length - 1 ? undefined : currentPath
    });
  }

  return breadcrumbs;
}

export function getLayoutType(path: string): string {
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length === 0 || segments[0] === 'home') {
    return 'home';
  }
  
  switch (segments[0]) {
    case 'tv':
      return 'tv';
    case 'internet':
      return 'internet';
    default:
      return 'default';
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function validateSlug(slug: string[]): boolean {
  // Define valid routes based on your requirements
  const validRoutes = [
    ['home'],
    ['tv'],
    ['tv', 'maxTv', 'stream'],
    ['tv', 'maxTv', 'equipment'],
    ['tv', 'doEvenMore', 'apps'],
    ['tv', 'doEvenMore', 'deals'],
    ['internet', 'package'],
    ['internet', 'links', 'plans']
  ];

  return validRoutes.some(route => 
    route.length === slug.length && 
    route.every((segment, index) => segment === slug[index])
  );
}