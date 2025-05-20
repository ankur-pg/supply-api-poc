# Supply API Architecture

This document describes the architecture of the Supply API proof of concept, which integrates NestJS with Elasticsearch to provide property listing data.

## System Components

### 1. Infrastructure
- **Elasticsearch**: Running in Docker (port 9201)
- **NestJS**: REST and GraphQL API server

### 2. Core Components

#### Data Layer
- **Elasticsearch Index**: `listings` - Stores property listing data
- **Data Import**: Script to import sample data into Elasticsearch
- **Utilities**: Reusable functions for working with Elasticsearch

#### API Layer
- **REST Controllers**: Standard HTTP endpoints for listing data
- **GraphQL API**: Flexible query interface for property data
- **Services**: Business logic for processing and querying data

## Directory Structure

```
src/
├── assets/                  # Sample data
│   └── SimpleSampleListings.json
├── graphql/                 # GraphQL definitions
│   ├── dto/                 # Data transfer objects
│   └── models/              # GraphQL models
├── listings/                # Listings REST API
│   ├── listings.controller.ts
│   └── listings.module.ts
├── scripts/                 # Utility scripts
│   └── import-data.ts       # Script to import data
├── supply/                  # GraphQL supply API
│   ├── supply.resolver.ts
│   └── supply.service.ts
├── utils/                   # Shared utilities
│   ├── es-client.ts         # Elasticsearch client factory
│   └── es-import.ts         # Data import utilities
├── app.module.ts            # Application module
└── main.ts                  # Application entry point
```

## Data Flow

1. **Data Import**:
   - Sample data is imported into Elasticsearch using the import script
   - Data is stored in the `listings` index

2. **REST API**:
   - `GET /listings` - Retrieves a list of property listings
   - `GET /listings/:country` - Retrieves property listings for a specific country

3. **GraphQL API**:
   - `/graphql` endpoint for flexible queries
   - `supplyStats` query for aggregation data

## Available Commands

- `npm run start`: Start the NestJS application
- `npm run start:dev`: Start the NestJS application in development mode
- `npm run import-data`: Import sample data into Elasticsearch

## Future Improvements

- Implement authentication and authorization
- Add support for pagination and sorting
- Enhance error handling and validation
- Add more advanced filtering options
