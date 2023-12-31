import { IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5, { message: "Rating can't be more than 5" })
  @Min(1, { message: "Rating can't be less than 1" })
  @IsNumber()
  rating: number;

  @IsMongoId()
  productId: Types.ObjectId | string;
}
