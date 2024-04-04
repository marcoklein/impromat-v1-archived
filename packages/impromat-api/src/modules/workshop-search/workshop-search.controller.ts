import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { WorkshopSearchResult } from './workshop-search-result.dto';
import { WorkshopSearchInput } from './workshop-search.input';
import { WorkshopSearchService } from './workshop-search.service';

@Resolver()
export class WorkshopSearchController {
  constructor(private workshopSearchService: WorkshopSearchService) {}

  @Query(() => [WorkshopSearchResult], {
    description: 'Universal search for workshops. Works for all users.',
  })
  async searchWorkshops(
    @Args() paginationArgs: PaginationArgs,
    @Args('input') input: WorkshopSearchInput,
    @SessionUserId() userId: string | undefined,
  ): Promise<WorkshopSearchResult[]> {
    return this.workshopSearchService.searchWorkshops(
      userId,
      input,
      paginationArgs,
    );
  }
}