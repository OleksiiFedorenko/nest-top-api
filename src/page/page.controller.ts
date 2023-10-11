import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Page } from './schemas/page.schema';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { FindPageDto } from './dto/find-page.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { PAGE_NOT_FOUND_ERROR } from './page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreatePageDto) {
    return this.pageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.pageService.findById(id);
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    return page;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.pageService.findByAlias(alias);
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  // async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: Page) { //Seems like dto type should be corrected
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreatePageDto,
  ) {
    const page = await this.pageService.updateById(id, dto);
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const removedPage = await this.pageService.deleteById(id);
    if (!removedPage) throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    return removedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() { firstCategory }: FindPageDto) {
    return this.pageService.findByCategory(firstCategory);
  }
}
