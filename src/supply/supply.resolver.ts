import { Args, Query, Resolver } from '@nestjs/graphql';
import { ListingAggregationInput } from '../graphql/dto/listingaggregate.input'
import { ListingAggregationStats } from '../graphql/models/listingaggregate-stats.model'
import { SupplyService } from './supply.service';

@Resolver()
export class SupplyResolver {
  constructor(private readonly supplyService: SupplyService) {}

  @Query(() => ListingAggregationStats)
  async listingAggregation(
    @Args('filters') filters: ListingAggregationInput
  ): Promise<ListingAggregationStats> {
    return this.supplyService.getListingAggregationStats(filters);
  }
}
