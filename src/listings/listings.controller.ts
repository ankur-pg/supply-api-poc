import { Controller, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller('listings')
export class ListingsController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get()
  async getAllListings() {
    try {
      const result = await this.elasticsearchService.search({
        index: 'listings',
        body: {
          size: 10
        }
      });

      // Handle both ES7 and ES8 response formats
      const total = typeof result.body.hits.total === 'number' 
        ? result.body.hits.total 
        : result.body.hits.total.value;

      return {
        total,
        listings: result.body.hits.hits.map(hit => hit._source)
      };
    } catch (error) {
      console.error('Error retrieving listings:', error);
      throw new HttpException('Failed to retrieve listings', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':country')
  async getListingsByCountry(@Param('country') country: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: 'listings',
        body: {
          query: {
            term: {
              'country.keyword': country
            }
          }
        }
      });

      // Handle both ES7 and ES8 response formats
      const total = typeof result.body.hits.total === 'number' 
        ? result.body.hits.total 
        : result.body.hits.total.value;
        
      return {
        total,
        listings: result.body.hits.hits.map(hit => hit._source)
      };
    } catch (error) {
      console.error(`Error retrieving listings for country ${country}:`, error);
      throw new HttpException(`Failed to retrieve listings for country ${country}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
