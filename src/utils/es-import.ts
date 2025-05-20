import * as fs from 'fs';
import * as path from 'path';
import { createEsClient } from './es-client';

/**
 * Imports data from a JSON file into an Elasticsearch index
 * 
 * @param filePath Path to the JSON file containing the data
 * @param indexName Name of the Elasticsearch index to import into
 * @param options Additional options
 * @returns Results of the import operation
 */
export async function importDataToElasticsearch(
  filePath: string, 
  indexName: string = 'listings',
  options: { 
    deleteExisting?: boolean,
    refresh?: boolean
  } = {}
) {
  const { deleteExisting = false, refresh = true } = options;
  const client = createEsClient();
  
  try {
    // Check if the index exists
    const indexExists = await client.indices.exists({ index: indexName });
    
    // Delete the existing index if requested
    if (indexExists && deleteExisting) {
      console.log(`Deleting existing index: ${indexName}`);
      await client.indices.delete({ index: indexName });
    }
    
    // Create the index if it doesn't exist
    if (!indexExists || deleteExisting) {
      console.log(`Creating index: ${indexName}`);
      await client.indices.create({ index: indexName });
    }
    
    // Read and parse the listings data
    console.log(`Reading data from ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const listings = Array.isArray(data) ? data : (data.hits?.hits || []);
    
    if (listings.length === 0) {
      return { success: false, error: 'No listings found in the data file' };
    }
    
    console.log(`Preparing to import ${listings.length} listings...`);
    
    // Prepare the bulk operations
    const operations = [];
    for (const listing of listings) {
      // Extract the document source properly
      const doc = listing._source || listing;
      
      // Add index operation
      operations.push({ index: { _index: indexName } });
      operations.push(doc);
    }
    
    // Perform the bulk insert
    if (operations.length > 0) {
      console.log(`Importing ${operations.length / 2} documents...`);
      // For Elasticsearch 7.x, we need to use 'body' instead of 'operations'
      const result = await client.bulk({
        refresh: refresh,
        body: operations
      });
      
      // Access the response data safely with type assertions
      const body = result.body || result as any;
      
      // Check for errors in the response
      const items = body.items || [];
      const successful = items.filter((item: any) => !item.index?.error).length || 0;
      const failed = items.filter((item: any) => !!item.index?.error).length || 0;
      
      console.log(`Successfully imported ${successful} documents`);
      
      if (failed > 0) {
        console.log(`Failed to import ${failed} documents`);
        const errors = items.filter((item: any) => !!item.index?.error) || [];
        console.log('First few errors:', errors.slice(0, 3));
      }
      
      return { 
        success: true,
        successful,
        failed,
        errors: failed > 0 ? items.filter((item: any) => !!item.index?.error) : []
      };
    }
    
    return { success: false, error: 'No operations to perform' };
  } catch (error) {
    console.error('Error importing data to Elasticsearch:', error);
    return { success: false, error: error.message };
  }
}
