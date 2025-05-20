import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ListingAggregationInput {
  @Field() country: string;

  @Field({ nullable: true }) region?: string;
  @Field({ nullable: true }) city?: string;

  @Field(() => Float, { nullable: true }) minPrice?: number;
  @Field(() => Float, { nullable: true }) maxPrice?: number;

  @Field(() => Int, { nullable: true }) minBedrooms?: number;
  @Field(() => Int, { nullable: true }) maxBedrooms?: number;

  @Field(() => Int, { nullable: true }) createdAfter?: number;
  @Field(() => Int, { nullable: true }) updatedBefore?: number;
}
