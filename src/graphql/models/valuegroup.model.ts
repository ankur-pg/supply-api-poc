import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ValueGroup {
  @Field(() => Float, { nullable: true }) price?: number;
  @Field(() => Float, { nullable: true }) psf?: number;
}
