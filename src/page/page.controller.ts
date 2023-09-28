import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Page } from './schemas/page.schema';
import { FindPageDto } from './dto/find-page.dto';

@Controller('page')
export class PageController {
  @Post('create')
  async create(@Body() dto: Omit<Page, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Page) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindPageDto) {}
}
