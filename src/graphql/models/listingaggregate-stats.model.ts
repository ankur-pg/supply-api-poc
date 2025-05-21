import { ObjectType, Field } from '@nestjs/graphql';
import { ValueGroup } from './valuegroup.model';
import { CountGroup } from './countgroup.model';
import { RegionGroupStats } from './regiongroupstats.model';

@ObjectType()
export class ListingAggregationStats {
  @Field(() => CountGroup, { nullable: true }) count?: CountGroup;
  @Field(() => ValueGroup, { nullable: true }) min?: ValueGroup;
  @Field(() => ValueGroup, { nullable: true }) max?: ValueGroup;
  @Field(() => ValueGroup, { nullable: true }) avg?: ValueGroup;

  @Field(() => [RegionGroupStats], { nullable: true }) groupByRegion?: RegionGroupStats[];
}
