import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { ListingAggregationInput } from '../graphql/dto/listingaggregate.input'
import { ListingAggregationStats } from '../graphql/models/listingaggregate-stats.model'

@Injectable()
export class SupplyService {
  constructor(private readonly es: ElasticsearchService) {}

  async getListingAggregationStats(input: ListingAggregationInput): Promise<ListingAggregationStats> {
    const must: any[] = [{ term: { 'country.keyword': input.country } }]

    if (input.region) must.push({ match: { 'location.region.text': input.region } })
    if (input.city) must.push({ match: { 'location.city': input.city } })
    if (input.minPrice) must.push({ range: { 'internalMeta.price.min': { gte: input.minPrice } } })
    if (input.maxPrice) must.push({ range: { 'internalMeta.price.max': { lte: input.maxPrice } } })
    if (input.createdAfter) must.push({ range: { 'dates.created.unix': { gte: input.createdAfter } } })
    if (input.updatedBefore) must.push({ range: { 'dates.updated.unix': { lte: input.updatedBefore } } })

    const aggs = input.groupBy === 'region'
      ? {
          group_by_region: {
            terms: {
              // field: 'location.region.text.keyword',
              field: 'location.fullAddress.keyword',
              size: 20,
              order: { _count: 'desc' }
            },
            aggs: {
              avgPrice: { avg: { field: 'internalMeta.price.min' } },
              avgPSF: { avg: { field: 'internalMeta.psf' } }
            }
          }
        }
      : {
          listing_id: { value_count: { field: 'id' } },
          uniqueAddressCount: { cardinality: { field: 'location.fullAddress.keyword' } },
          min_price: { min: { field: 'internalMeta.price.min' } },
          max_price: { max: { field: 'internalMeta.price.max' } },
          avg_price: { avg: { field: 'internalMeta.price.min' } },
          min_psf: { min: { field: 'internalMeta.psf' } },
          max_psf: { max: { field: 'internalMeta.psf' } },
          avg_psf: { avg: { field: 'internalMeta.psf' } }
        }

    const response = await this.es.search({
      index: 'listings',
      body: {
        size: 0,
        query: { bool: { must } },
        aggs
      }
    })

    const aggData = response.body.aggregations

    // If groupBy is region, return group-wise stats
    if (input.groupBy === 'region') {
      const buckets = aggData.group_by_region.buckets || []
      return {
        count: null,
        min: null,
        max: null,
        avg: null,
        groupByRegion: buckets.map((bucket: any) => ({
          region: bucket.key,
          totalListings: bucket.doc_count,
          avgPrice: bucket.avgPrice?.value ?? null,
          avgPSF: bucket.avgPSF?.value ?? null
        }))
      }
    }

    // Return overall stats
    return {
      count: {
        listing_id: aggData.listing_id?.value ?? 0,
        uniqueAddresses: aggData.uniqueAddressCount?.value ?? 0
      },
      min: {
        price: aggData.min_price?.value ?? null,
        psf: aggData.min_psf?.value ?? null
      },
      max: {
        price: aggData.max_price?.value ?? null,
        psf: aggData.max_psf?.value ?? null
      },
      avg: {
        price: aggData.avg_price?.value ?? null,
        psf: aggData.avg_psf?.value ?? null
      }
    }
  }
}
