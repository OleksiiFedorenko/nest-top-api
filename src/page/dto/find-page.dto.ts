import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../schemas/page.schema';

export class FindPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
