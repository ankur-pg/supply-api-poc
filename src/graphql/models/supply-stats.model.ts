import { ObjectType, Field, Float, Int } from '@nestjs/graphql'

@ObjectType()
export class SupplyStats {
  @Field(() => Int) totalListings: number

  @Field(() => Float, { nullable: true }) minPrice?: number
  @Field(() => Float, { nullable: true }) maxPrice?: number
  @Field(() => Float, { nullable: true }) avgPrice?: number

  @Field(() => Float, { nullable: true }) minPSF?: number
  @Field(() => Float, { nullable: true }) maxPSF?: number
  @Field(() => Float, { nullable: true }) avgPSF?: number

  @Field(() => Int, { nullable: true }) newListingsLast30Days?: number
}
