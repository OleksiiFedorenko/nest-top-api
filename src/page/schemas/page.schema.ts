import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class DouData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class PageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

// @Schema()
// export class PageAdvantageSchema {
//   @Prop()
//   title: string;

//   @Prop()
//   description: string;
// }

// export const PageAdvantageModel =
//   SchemaFactory.createForClass(PageAdvantageSchema);

@Schema({ timestamps: true })
export class Page {
  // @Prop()
  // _id: string;

  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: DouData })
  dou?: DouData;

  @Prop([PageAdvantage])
  advantages: PageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];

  // fix for sitemap
  @Prop()
  updatedAt: string;
}

export const PageSchema = SchemaFactory.createForClass(Page).index({
  // To search in all fields
  '$**': 'text',
});

// export const PageSchema = SchemaFactory.createForClass(Page).index({
// To search in certain fields
//   title: 'text',
//   seoText: 'text',
//   advantages: 'text',
// });
