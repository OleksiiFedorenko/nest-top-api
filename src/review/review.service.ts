import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

class Leak {}

const leaks: Leak[] = [];

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<Review[]> {
    leaks.push(new Leak());

    return this.reviewModel.find({ productId }).exec();
  }

  async deleteByProductId(
    productId: string,
  ): Promise<{ deletedCount: number }> {
    return this.reviewModel.deleteMany({ productId }).exec();
  }
}
