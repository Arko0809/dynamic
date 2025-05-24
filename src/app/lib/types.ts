// lib/types.ts

export interface DrupalResponse<T = any> {
  data: T;
  included?: any[];
  jsonapi: {
    version: string;
    meta?: any;
  };
  links?: {
    self: string;
    next?: string;
    prev?: string;
  };
  meta?: {
    count?: number;
    [key: string]: any;
  };
}

export interface PageData {
  title: any;
  meta: any;
  id: string;
  type: string;
  attributes: {
    title: string;
    path: string;
    status: boolean;
    created: string;
    changed: string;
    field_meta_title?: string;
    field_meta_description?: string;
    field_layout_type: string;
    field_components: ComponentData[];
  };
  relationships?: {
    field_layout?: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface ComponentData {
  id: string;
  type: string;
  attributes: {
    component_type?: string;
    title?: string;
    content?: string;
    settings?: Record<string, any>;
    field_hero_title?: string;
    field_hero_subtitle?: string;
    field_hero_image?: string;
    field_features?: FeatureItem[];
    field_pricing_plans?: PricingPlan[];
    field_content_blocks?: ContentBlock[];
  };
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  cta_text?: string;
  cta_url?: string;
}

export interface ContentBlock {
  title?: string;
  content: string;
  image?: string;
  layout?: 'full' | 'left' | 'right';
}

export interface LayoutData {
  id: string;
  type: string;
  attributes: {
    name: string;
    template: string;
    settings: {
      header_style?: string;
      sidebar_enabled?: boolean;
      footer_style?: string;
      [key: string]: any;
    };
  };
}

export interface NavigationItem {
  title: string;
  url: string;
  children?: NavigationItem[];
  weight?: number;
  enabled: boolean;
}

export interface BreadcrumbItem {
  title: string;
  url?: string;
}

export interface DynamicPageProps {
  params: {
    slug: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}