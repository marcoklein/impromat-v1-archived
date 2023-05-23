import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from 'src/environment';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { ElementSearchController } from './controllers/element-search.controller';
import { ElementController } from './controllers/element.controller';
import { UserFavoriteElementController } from './controllers/user-favorite-element.controller';
import { UserFavoriteElementsController } from './controllers/user-favorite-elements.controller';
import { UserLikedWorkshopController } from './controllers/user-liked-workshop.controller';
import { MeResolver } from './controllers/user.controller';
import { WorkshopElementController } from './controllers/workshop-element.controller';
import { WorkshopSectionController } from './controllers/workshop-section.controller';
import { WorkshopController } from './controllers/workshop.controller';
import { ElementSearchService } from './services/element-search.service';
import { ElementService } from './services/element.service';
import { UserFavoriteElementsService } from './services/user-favorite-elements.service';
import { UserLikedWorkshopsService } from './services/user-liked-workshops.service';
import { UserSessionService } from './services/user-session.service';
import { WorkshopElementService } from './services/workshop-element.service';
import { WorkshopService } from './services/workshop.service';
import { UserElementsService } from './services/user-elements.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      autoSchemaFile: environment.GRAPHQL_SCHEMA_GENERATION_PATH,
      installSubscriptionHandlers: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      cors: {
        credentials: true,
        origin: true,
      },
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    UserFavoriteElementController,
    UserFavoriteElementsController,
    UserLikedWorkshopController,
    UserFavoriteElementsService,
    ElementSearchController,
    WorkshopController,
    WorkshopSectionController,
    WorkshopElementController,
    WorkshopElementService,
    ElementController,
    ElementService,
    MeResolver,
    UserSessionService,
    WorkshopService,
    ElementSearchService,
    UserLikedWorkshopsService,
    UserElementsService,
  ],
})
export class GraphqlModule {}
