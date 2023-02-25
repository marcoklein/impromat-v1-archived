import { Injectable } from '@nestjs/common';
import { Element as PrismaElement } from '@prisma/client';
import Fuse from 'fuse.js';
import { ElementSearchInput } from 'src/dtos/inputs/element-search-input.ts';
import { PrismaService } from './prisma.service';

@Injectable()
export class ElementSearchService {
  constructor(private prismaService: PrismaService) {}

  async searchElements(
    userRequestId: string,
    searchElementsInput: ElementSearchInput,
  ): Promise<
    { element: PrismaElement; score: number; matches: { key: string }[] }[]
  > {
    const elementsToSearch = await this.prismaService.element.findMany({
      where: {
        OR: [
          {
            ownerId: userRequestId,
          },
          {
            visibility: 'PUBLIC',
          },
        ],
      },
    });
    if (!searchElementsInput.text) {
      return elementsToSearch.map((element) => ({
        element,
        score: 1,
        matches: [],
      }));
    }
    const fuse = new Fuse(elementsToSearch, {
      keys: ['name'],
      includeScore: true,
      includeMatches: true,
    });

    return fuse.search(searchElementsInput.text).map((fuseResult) => ({
      element: fuseResult.item,
      score: fuseResult.score ?? 1,
      matches: fuseResult.matches as any,
      // fuseResult.matches?.map((match) => ({ key: match.key ?? '' })) ?? [],
    }));
  }
}