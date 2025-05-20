<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a proof of concept for a supply API that integrates with Elasticsearch to provide property listing data.

## Setup

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose

### Installation

```bash
npm install
```

### Running Elasticsearch

```bash
docker compose up -d
```

This will start an Elasticsearch instance on port 9201.

### Importing Sample Data

```bash
npm run import-data
```

This will import the sample listing data from `src/assets/SimpleSampleListings.json` into the Elasticsearch index named `listings`.

## Available Scripts

- `npm run start`: Start the NestJS application
- `npm run start:dev`: Start the NestJS application in watch mode
- `npm run import-data`: Import sample data into Elasticsearch
- `npm run start:api`: Start the NestJS API server

## API Endpoints

When using the simple API server (`npm run simple-api`), the following endpoints are available:

- `GET /`: Health check endpoint that returns the Elasticsearch cluster status
- `GET /api/listings`: Get all listings
- `GET /api/listings/:country`: Get listings filtered by country

## Working with GraphQL

The NestJS application also exposes a GraphQL endpoint at `/graphql` for querying supply statistics.

```graphql
query {
  supplyStats(country: "SG") {
    totalListings
    minPrice
    maxPrice
    avgPrice
  }
}
```

## Troubleshooting

### Port Conflict

If you have an existing Elasticsearch instance running on port 9200, the Docker container will use port 9201 instead. Update the connection configuration in `app.module.ts` and scripts if needed.

### Elasticsearch Client Version

This project uses Elasticsearch client version 8.10.0, which should be compatible with the Elasticsearch 8.11.1 server.
