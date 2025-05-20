import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { importDataToElasticsearch } from '../utils/es-import';

/**
 * Command line script to import listings data into Elasticsearch
 */
async function importListings() {
  try {
    // Path to the simplified sample listings data
    const filePath = path.join(__dirname, '..', 'assets', 'SimpleSampleListingsV2.json');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }
    
    // Import data with default options (delete existing index and refresh)
    const result = await importDataToElasticsearch(filePath, 'listings', { 
      deleteExisting: true,
      refresh: true 
    });
    
    if (result.success) {
      console.log('Import completed successfully!');
      process.exit(0);
    } else {
      console.error('Import failed:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error running import script:', error);
    process.exit(1);
  }
}

// Run the import function
importListings();
