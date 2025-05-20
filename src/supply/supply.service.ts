import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ListingAggregationInput } from '../graphql/dto/listingaggregate.input';
import { ListingAggregationStats } from '../graphql/models/listingaggregate-stats.model';

@Injectable()
export class SupplyService {
  constructor(private readonly es: ElasticsearchService) {}

  async getListingAggregationStats(input: ListingAggregationInput): Promise<ListingAggregationStats> {
    const must: any[] = [{ term: { 'country.keyword': input.country } }];

    if (input.region) must.push({ match: { 'location.region.text': input.region } });
    if (input.city) must.push({ match: { 'location.city': input.city } });
    if (input.minPrice) must.push({ range: { 'internalMeta.price.min': { gte: input.minPrice } } });
    if (input.maxPrice) must.push({ range: { 'internalMeta.price.max': { lte: input.maxPrice } } });
    if (input.createdAfter) {
      must.push({ range: { 'dates.created.unix': { gte: input.createdAfter } } });
    }
    if (input.updatedBefore) {
      must.push({ range: { 'dates.updated.unix': { lte: input.updatedBefore } } });
    }

    const response = await this.es.search({
      index: 'listings',
      body: {
        size: 0,
        query: {
          bool: { must }
        },
        aggs: {
          listing_id: { value_count: { field: 'id' } },
          min_price: { min: { field: 'internalMeta.price.min' } },
          max_price: { max: { field: 'internalMeta.price.max' } },
          avg_price: { avg: { field: 'internalMeta.price.min' } },
          min_psf: { min: { field: 'internalMeta.psf' } },
          max_psf: { max: { field: 'internalMeta.psf' } },
          avg_psf: { avg: { field: 'internalMeta.psf' } }
        }
      }
    });

    const aggs = response.body.aggregations;

    return {
      count: {
        listing_id: aggs.listing_id?.value ?? 0
      },
      min: {
        price: aggs.min_price?.value ?? null,
        psf: aggs.min_psf?.value ?? null
      },
      max: {
        price: aggs.max_price?.value ?? null,
        psf: aggs.max_psf?.value ?? null
      },
      avg: {
        price: aggs.avg_price?.value ?? null,
        psf: aggs.avg_psf?.value ?? null
      }
    };
  }
}
