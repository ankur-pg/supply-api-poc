import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SupplyResolver } from './supply/supply.resolver';
import { SupplyService } from './supply/supply.service';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9201'
    }),
    ListingsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        // Use specific playground options to avoid UI glitches
        settings: {
          'editor.theme': 'light',
          'editor.fontSize': 14,
          'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
          'editor.cursorShape': 'line', // Use simple cursor
          'editor.reuseHeaders': true,
          'request.credentials': 'same-origin',
          'tracing.hideTracingResponse': false,
          'queryPlan.hideQueryPlanResponse': false,
        }
      },
      introspection: true, // Allow schema introspection for Playground
    }),
  ],
  exports: [ElasticsearchModule],
  controllers: [AppController],
  providers: [AppService, SupplyResolver, SupplyService],
})
export class AppModule {}
