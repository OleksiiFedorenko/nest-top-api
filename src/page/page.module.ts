import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { PageService } from './page.service';
import { DouModule } from 'src/dou/dou.module';

@Module({
  controllers: [PageController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Page.name,
        schema: PageSchema,
      },
    ]),
    DouModule,
  ],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
