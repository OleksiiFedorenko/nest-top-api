import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { PageModule } from 'src/page/page.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SitemapController],
  imports: [PageModule, ConfigModule],
})
export class SitemapModule {}
