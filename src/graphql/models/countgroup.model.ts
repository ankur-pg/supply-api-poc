import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountGroup {
  @Field(() => Int)
  listing_id: number;

  @Field(() => Int, { nullable: true })
  uniqueAddresses?: number;
}
