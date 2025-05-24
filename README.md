# Dynamic Next.js App with Drupal-like Data

This project is a dynamic Next.js application that mimics a Drupal-like data structure. It is designed to serve content dynamically based on URL slugs, allowing for flexible page rendering and API responses.

## Project Structure

The project is organized as follows:

```
dynamic-nextjs-drupal-app
├── app
│   ├── layout.tsx                    # Root layout for the application
│   ├── page.tsx                       # Home page (redirects to /home)
│   ├── api
│   │   └── pages
│   │       └── [...slug]
│   │           └── route.ts           # Dynamic API endpoint
│   ├── [...slug]
│   │   └── page.tsx                   # Dynamic page handler
│   ├── components
│   │   ├── layouts
│   │   │   ├── HomeLayout.tsx
│   │   │   ├── TVLayout.tsx
│   │   │   ├── InternetLayout.tsx
│   │   │   └── DefaultLayout.tsx
│   │   ├── ui
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Breadcrumb.tsx
│   │   └── content
│   │       ├── HeroSection.tsx
│   │       ├── FeatureGrid.tsx
│   │       ├── PricingTable.tsx
│   │       └── ContentBlock.tsx
│   ├── data
│   │   ├── pages
│   │   │   ├── home.json
│   │   │   ├── tv.json
│   │   │   ├── tv-maxTv-stream.json
│   │   │   ├── tv-maxTv-equipment.json
│   │   │   ├── tv-doEvenMore-apps.json
│   │   │   ├── tv-doEvenMore-deals.json
│   │   │   ├── internet-package.json
│   │   │   └── internet-links-plans.json
│   │   ├── layouts
│   │   │   └── layouts.json
│   │   └── components
│   │       └── navigation.json
│   ├── lib
│   │   ├── types.ts                   # TypeScript types
│   │   └── utils.ts                   # Utility functions
│   └── styles
│       └── globals.css                # Global CSS styles
├── package.json                       # npm configuration file
├── tsconfig.json                     # TypeScript configuration file
└── README.md                         # Project documentation
```

## Features

- **Dynamic Routing**: The application supports dynamic routing based on slugs, allowing for flexible content delivery.
- **API Integration**: A dynamic API endpoint is implemented to handle requests and serve data based on the URL.
- **Component-Based Architecture**: The application is built using reusable components, promoting maintainability and scalability.
- **Data-Driven Pages**: Content is served from JSON files, making it easy to manage and update without changing the codebase.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd dynamic-nextjs-drupal-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to see the application in action.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.