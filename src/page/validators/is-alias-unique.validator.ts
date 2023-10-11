import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PageService } from '../page.service';

@ValidatorConstraint({ name: 'IsAliasUnique', async: true })
@Injectable()
export class IsAliasUnique implements ValidatorConstraintInterface {
  constructor(private readonly pageService: PageService) {}

  async validate(alias: string) {
    const page = await this.pageService.findByAlias(alias);
    return !page;
  }

  defaultMessage(args: ValidationArguments) {
    return `Alias "${args.value}" already exists. Choose a different one.`;
  }
}
