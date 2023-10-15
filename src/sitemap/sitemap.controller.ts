import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PageService } from 'src/page/page.service';
import { addDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {
  domain: string;

  constructor(
    private readonly pageService: PageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }

  @Get('xml')
  @Header('content-type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    let res = [
      {
        loc: this.domain,
        lastmod: format(addDays(new Date(), -1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: this.domain + CATEGORY_URL[0],
        lastmod: format(addDays(new Date(), -1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
    ];
    const pages = await this.pageService.findAll();
    if (pages)
      res = res.concat(
        pages.map((page) => {
          return {
            loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${
              page.alias
            }`,
            lastmod: format(new Date(page.updatedAt), formatString),
            changefreq: 'weekly',
            priority: '0.7',
          };
        }),
      );
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });
    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'http://www.sitemap.org/schemas/sitemap/0.9',
        },
        url: res,
      },
    });
  }
}
