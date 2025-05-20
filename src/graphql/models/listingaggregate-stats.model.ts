import { ObjectType, Field } from '@nestjs/graphql';
import { ValueGroup } from './valuegroup.model';
import { CountGroup } from './countgroup.model';

@ObjectType()
export class ListingAggregationStats {
  @Field(() => CountGroup) count: CountGroup;
  @Field(() => ValueGroup) min: ValueGroup;
  @Field(() => ValueGroup) max: ValueGroup;
  @Field(() => ValueGroup) avg: ValueGroup;
}
