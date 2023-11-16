import { Module } from '@nestjs/common';
import { DouService } from './dou.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [DouService],
  imports: [HttpModule],
  exports: [DouService],
})
export class DouModule {}
