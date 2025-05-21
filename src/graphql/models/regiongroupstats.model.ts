import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegionGroupStats {
  @Field() region: string;

  @Field(() => Int) totalListings: number;

  @Field(() => Float, { nullable: true }) avgPrice?: number;
  @Field(() => Float, { nullable: true }) avgPSF?: number;
}
