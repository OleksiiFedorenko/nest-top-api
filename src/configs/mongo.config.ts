import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
  return { uri: configService.get('MONGO_URI') };
};
