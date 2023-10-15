import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page, TopLevelCategory } from './schemas/page.schema';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<Page>,
  ) {}

  async create(dto: CreatePageDto): Promise<Page> {
    return this.pageModel.create(dto);
  }

  async findAll(): Promise<Page[] | null> {
    return this.pageModel.find({}).exec();
  }

  async findById(id: string): Promise<Page | null> {
    return this.pageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<Page | null> {
    return this.pageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.pageModel
      .aggregate()
      .match({ firstCategory })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  // Different syntax
  // async findByCategory(firstCategory: TopLevelCategory) {
  //   return this.pageModel
  //     .aggregate([
  //       { $match: { firstCategory } },
  //       {
  //         $group: {
  //           _id: { secondCategory: '$secondCategory' },
  //           pages: { $push: { alias: '$alias', title: '$title' } },
  //         },
  //       },
  //     ])
  //     .exec();
  // }

  // Flat search (not nested)
  // async findByCategory(firstCategory: TopLevelCategory) {
  //   return this.pageModel
  //     .find(
  //       { firstCategory },
  //       { alias: 1, firstCategory: 1, secondCategory: 1, title: 1 },
  //     )
  //     .exec();
  // }

  async findByText(text: string) {
    return this.pageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async deleteById(id: string): Promise<Page | null> {
    return this.pageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreatePageDto): Promise<Page | null> {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
