import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
  Validate,
  IsDate,
} from 'class-validator';
import { TopLevelCategory } from '../schemas/page.schema';
import { IsAliasUnique } from '../validators/is-alias-unique.validator';

export class DouDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;

  @IsDate()
  updatedAt: Date;
}

export class PageAdvantageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreatePageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  //must be unique
  @IsNotEmpty()
  @IsString()
  @Validate(IsAliasUnique)
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DouDataDto)
  dou?: DouDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => PageAdvantageDto)
  advantages: PageAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
