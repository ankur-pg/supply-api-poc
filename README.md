# Supply API Proof of Concept

This repository contains a proof of concept for a property supply API that integrates with Elasticsearch to provide property listing data. It's built using NestJS and provides both GraphQL API interfaces.

You can view the contract here - https://propertyguru.atlassian.net/wiki/spaces/ATS/pages/34458173765/Draft+Demand+and+Supply+SOT+API

## Getting Started

### Prerequisites

- Node.js (v18+) - [Download from nodejs.org](https://nodejs.org/)
- Docker and Docker Compose - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- Git (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd supply-api-poc
```

### Step 2: Install Dependencies

The project may have dependency conflicts due to specific version requirements. Use the following command to install dependencies:

```bash
npm install --legacy-peer-deps
```

If you encounter specific errors with packages like `@apollo/server`, you can install them manually:

```bash
npm install @apollo/server --save --legacy-peer-deps
```

### Step 3: Start Elasticsearch

The application requires Elasticsearch. Start it using Docker Compose:

```bash
docker compose up -d
```

This will start an Elasticsearch instance on port 9201.

### Step 4: Import Sample Data

Before using the API, you need to import the sample property listings data into Elasticsearch:

```bash
npm run import-data
```

This script:
- Connects to your local Elasticsearch instance
- Reads the sample data from `src/assets/SimpleSampleListingsV2.json`
- Creates or recreates the `listings` index
- Imports all property listings into the index

If you run into TypeScript-related issues when running the import script, you can run it directly with ts-node:

```bash
npx ts-node -r tsconfig-paths/register src/scripts/import-data.ts
```

### Step 5: Start the API Server

Once the data is imported, start the NestJS application:

```bash
npm run start
```

Or for development with hot reload:

```bash
npm run start:dev
```

The server will typically run on http://localhost:3000 by default.

## Available Scripts

- `npm run start`: Start the NestJS application
- `npm run start:dev`: Start the NestJS application with hot reload
- `npm run start:debug`: Start with debugging enabled
- `npm run start:port`: Start on specific port (PORT=3000)
- `npm run build`: Build the application
- `npm run import-data`: Import sample data into Elasticsearch
- `npm run lint`: Run ESLint

## Using the API

### GraphQL Interface

The application also exposes a GraphQL endpoint at `/graphql`. You can access the GraphQL Playground at this URL in your browser to test queries.

Example queries:

```graphql
# Get aggregated listing stats with filters
query {
  listingAggregation(filters: { country: "SG" }) {
    count {
      listing_id
      uniqueAddresses
    }
    min { price psf }
    max { price psf }
    avg { price psf }
  }
}

```

## Project Structure

- `/src/assets` - Contains sample data files
- `/src/scripts` - Utility scripts like the data import tool
- `/src/graphql` - GraphQL models and DTOs
- `/src/supply` - Supply service implementation and resolver
- `/src/listings` - REST API controllers for listings
- `/src/utils` - Utility functions for Elasticsearch

## Troubleshooting

### Dependency Conflicts

If you encounter dependency conflicts during installation, try using:
```bash
npm install --legacy-peer-deps
```

### Missing Modules

If you get "Cannot find module" errors when starting the application:
```bash
# Install the specific missing module
npm install @apollo/server --legacy-peer-deps
```

### Port Conflict

If you have an existing Elasticsearch instance running on port 9200, the Docker container will use port 9201 instead. The connection configuration in the codebase is already set to use port 9201.

### Elasticsearch Connection Issues

Check that your Elasticsearch container is running:
```bash
docker ps
```

If it's not running, restart it:
```bash
docker compose up -d
```

## Development

### Adding New Features

When adding new features:
1. Create appropriate models in `/src/graphql/models`
2. Define input DTOs in `/src/graphql/dto`
3. Implement the service logic in `/src/supply/supply.service.ts`
4. Expose GraphQL endpoints in `/src/supply/supply.resolver.ts`
