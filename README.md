# EntertainmentCorp Dynamic Next.js Platform

This project is a dynamic, data-driven content platform built with Next.js, designed to mimic a Drupal-like CMS structure. It enables flexible, component-based page rendering using JSON data, supporting dynamic routes, layouts, and API endpoints.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture & Data Flow](#architecture--data-flow)
- [Directory Structure](#directory-structure)
- [How Dynamic Routing Works](#how-dynamic-routing-works)
- [Component Rendering Flow](#component-rendering-flow)
- [API Layer](#api-layer)
- [Adding/Editing Content](#addingediting-content)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

- **Purpose:**
  - Serve dynamic, CMS-like pages using static JSON data and a flexible React component system.
  - Allow non-developers to update site content by editing JSON files, not code.
  - Support multiple layouts (Home, TV, Internet, Default) and reusable content blocks (Hero, FeatureGrid, PricingTable, etc).

- **Key Features:**
  - Dynamic Next.js routing based on URL slugs.
  - Data-driven page and component rendering.
  - API endpoints for page data (mimicking a headless CMS).
  - Theming and layout switching based on page type.
  - Modern, maintainable, and scalable codebase.

---

## Architecture & Data Flow

1. **Request Flow:**
   - User visits a URL (e.g., `/tv/maxTv/stream`).
   - Next.js dynamic route (`src/app/[...slug]/page.tsx`) parses the slug and fetches page data from the API (`/api/pages/[...slug]`).
   - The API handler (`src/app/api/pages/[...slug]/route.ts`) loads the corresponding JSON file from `src/data/pages/`.
   - The JSON data describes the page layout, meta, and a list of components to render.
   - The page is rendered using the correct layout and components, all driven by the data.

2. **Component Rendering:**
   - Each page's JSON lists `field_components` (e.g., hero, feature grid, pricing table).
   - The layout file (e.g., `HomeLayout.tsx`) maps over these and uses `ComponentRenderer.tsx` to render the correct React component for each block.
   - All props for components come from the JSON data, not hardcoded in React.

3. **Navigation & Footer:**
   - Navigation and footer links are also data-driven, with defaults in code and/or loaded from `src/data/components/navigation.json`.

---

## Directory Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (global styles, fonts)
│   │   ├── page.tsx                  # Home page (redirects to /home)
│   │   ├── [...slug]/page.tsx        # Dynamic route handler
│   │   ├── api/pages/[...slug]/      # API endpoint for page data
│   │   └── components/
│   │       ├── layouts/              # Layouts for each page type
│   │       ├── content/              # Content blocks (Hero, FeatureGrid, etc)
│   │       └── ui/                   # UI elements (Header, Footer, Navigation)
│   ├── data/
│   │   ├── pages/                    # JSON files for each page
│   │   ├── layouts/                  # Layout config JSON
│   │   └── components/               # Navigation, etc
│   ├── lib/                          # Types and utility functions
│   └── styles/                       # Tailwind/global CSS
├── public/                           # Static assets
├── README.md
└── ...
```

---

## How Dynamic Routing Works

- **Dynamic Route:** `src/app/[...slug]/page.tsx`
  - Handles all routes (e.g., `/home`, `/tv/maxTv/stream`, etc).
  - Extracts the slug, fetches page data from `/api/pages/[...slug]`.
  - If no data is found, returns a 404 page.
  - Uses the `field_layout_type` from the data to select the correct layout (Home, TV, Internet, Default).

- **API Endpoint:** `src/app/api/pages/[...slug]/route.ts`
  - Receives the slug, converts it to a file path, and loads the corresponding JSON from `src/data/pages/`.
  - If the file doesn't exist, returns a 404 error (or creates a default home page if `/home`).
  - Returns the JSON data in a Drupal-like API format.

---

## Component Rendering Flow

- Each page JSON includes a `field_components` array.
- The layout file (e.g., `HomeLayout.tsx`) maps over this array.
- For each component, `ComponentRenderer.tsx` dynamically selects and renders the correct React component (e.g., `HeroSection`, `FeatureGrid`, `ContentBlock`, `PricingTable`).
- All props for these components are passed from the JSON data.
- This allows new content blocks to be added/edited by updating JSON, not React code.

---

## API Layer

- **Purpose:**
  - Acts as a headless CMS API, serving page data as JSON.
  - Used by the frontend to fetch all content for a given route.
- **How it works:**
  - Receives a slug, loads the corresponding file, and returns the data.
  - Handles missing files gracefully (returns 404 or creates a default home page).

---

## Adding/Editing Content

- **To add a new page:**
  1. Create a new JSON file in `src/data/pages/` (e.g., `about.json`).
  2. Follow the structure of existing files (see `home.json` for reference).
  3. Add your desired `field_components` (see below for supported types).
  4. The new page will be available at `/about`.

- **To edit navigation or layouts:**
  - Edit `src/data/components/navigation.json` or `src/data/layouts/layouts.json`.

- **Supported component types:**
  - `hero_section`, `feature_grid`, `content_blocks`, `pricing_table`, etc. (see `ComponentRenderer.tsx` for mapping).

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dynamic-nextjs-drupal-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## Contributing

- Please open issues or pull requests for bugs, improvements, or new features.
- All contributions are welcome!

---

## License

MIT License. See `LICENSE` for details.