import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { API_URL } from './dou.constants';
import { DouResponse } from './dou.models';
import { DouData } from 'src/page/schemas/page.schema';

@Injectable()
export class DouService {
  constructor(private readonly httpService: HttpService) {}

  async getData(text: string) {
    try {
      // this.httpService.get(API_URL.smth, {
      //   params: {
      //     text,
      //     cluster: true
      //   },
      //   headers: {
      //     Authorization: 'Bearer ' + token
      //   }
      // });
      const res = await this.httpService
        .get<DouResponse>(API_URL.smth)
        .toPromise();
      if (!res) throw new Error('Something went wrong');
      return this.parseData(res.data);
    } catch (e) {
      //NEST logger
      Logger.error(e);
      // console.log(e);
    }
  }

  private parseData(data: DouResponse): DouData {
    return {
      count: data.quantity,
      juniorSalary: data.low,
      middleSalary: data.mid,
      seniorSalary: data.high,
      updatedAt: new Date(),
    };
  }
}
