import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9201',
    }),
  ],
  controllers: [ListingsController],
})
export class ListingsModule {}
