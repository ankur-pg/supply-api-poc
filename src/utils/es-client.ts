import { Client } from '@elastic/elasticsearch';

/**
 * Creates and returns a configured Elasticsearch client
 * @param customConfig Optional custom configuration parameters
 * @returns Elasticsearch Client instance
 */
export function createEsClient(customConfig: Record<string, any> = {}) {
  return new Client({
    node: process.env.ES_HOST || 'http://localhost:9201',
    ssl: {
      rejectUnauthorized: false
    },
    ...customConfig
  });
}
