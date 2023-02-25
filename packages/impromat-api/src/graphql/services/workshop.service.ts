import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateWorkshopSectionInput } from 'src/dtos/inputs/workshop-section-input';
import { PrismaService } from './prisma.service';
import {
  CreateWorkshopInput,
  UpdateWorkshopInput,
} from '../../dtos/inputs/workshop.inputs';

@Injectable()
export class WorkshopService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // TODO all function take the userSessionId => could this also be injected for specific requests?
  findWorkshopById(userSessionId: string, id: string) {
    return this.prismaService.workshop.findFirst({
      where: { id, ownerId: userSessionId },
    });
  }

  findWorkshopsFromUser(userSessionId: string) {
    return this.prismaService.workshop.findMany({
      where: { ownerId: userSessionId },
    });
  }

  async deleteWorkshop(userSessionId: string, workshopId: string) {
    const existingWorkshop = await this.findWorkshopById(
      userSessionId,
      workshopId,
    );
    if (!existingWorkshop) {
      return null;
    }
    const result = await this.prismaService.workshop.delete({
      where: { id: workshopId },
    });
    return result;
  }

  async createWorkshop(
    sessionUserId: string,
    createWorkshopInput: CreateWorkshopInput,
  ) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { id: sessionUserId },
    });
    const workshop = await this.prismaService.workshop.create({
      data: {
        ...createWorkshopInput,
        ownerId: user.id,
        sections: { create: [{ orderIndex: 0 }] },
      },
    });
    return workshop;
  }

  private updateSortedEntities(
    entities: { id?: string; orderIndex?: number }[],
    input?: {
      delete?: { id: string }[];
      update?: { id: string; orderIndex?: number }[];
      create?: { orderIndex?: number }[];
    },
  ) {
    if (!input) return;
    const withoutDeleted = entities.filter(
      (existingSection) =>
        !input.delete?.find((input) => input.id === existingSection.id),
    );
    const withUpdates = withoutDeleted.map((section) => {
      const updatedSection = input.update?.find(
        ({ id }) =>
          id !== undefined && section.id !== undefined && id === section.id,
      );
      if (updatedSection?.orderIndex !== undefined) {
        section.orderIndex = updatedSection.orderIndex;
      }
      return section;
    });
    const withCreated = withUpdates.concat(...(input.create ?? []));
    const sorted = withCreated.sort(
      (a, b) =>
        (a.orderIndex ?? Number.MAX_SAFE_INTEGER) -
        (b.orderIndex ?? Number.MAX_SAFE_INTEGER),
    );
    sorted.forEach((section, index) => {
      section.orderIndex = index;
    });
  }

  async updateWorkshop(
    sessionUserId: string,
    updateWorkshopInput: UpdateWorkshopInput,
  ) {
    const existingWorkshop = await this.prismaService.workshop.findFirstOrThrow(
      {
        where: { id: updateWorkshopInput.id, ownerId: sessionUserId },
        include: {
          sections: {
            include: {
              elements: true,
            },
          },
        },
      },
    );

    // TODO verify that inputs really belong to user

    this.updateSortedEntities(
      existingWorkshop.sections,
      updateWorkshopInput.sections,
    );

    const elementsDbQuery = (
      sectionDto: UpdateWorkshopSectionInput,
    ): Prisma.WorkshopElementUpdateManyWithoutWorkshopSectionNestedInput => {
      const existingElements =
        existingWorkshop.sections.find(
          (section) => section.id === sectionDto.id,
        )?.elements ?? [];

      this.updateSortedEntities(existingElements, sectionDto.elements);

      return {
        create: sectionDto.elements?.create,
        update: sectionDto.elements?.update?.map((element) => ({
          where: { id: element.id },
          data: element,
        })),
        delete: sectionDto.elements?.delete,
      };
    };

    const update:
      | Prisma.Enumerable<Prisma.WorkshopSectionUpdateWithWhereUniqueWithoutWorkshopInput>
      | undefined = updateWorkshopInput.sections?.update?.map((section) => ({
      where: { id: section.id },
      data: {
        ...section,
        ...{
          elements: elementsDbQuery(section),
        },
      },
    }));

    const create:
      | Prisma.Enumerable<Prisma.WorkshopSectionCreateWithoutWorkshopInput>
      | undefined = updateWorkshopInput.sections?.create?.map(
      (section) => section,
    );

    await this.prismaService.$transaction(async (tx) => {
      await tx.workshop.update({
        data: {
          ...updateWorkshopInput,
          ...{
            sections: {
              update,
              create,
              delete: updateWorkshopInput.sections?.delete,
            },
          },
        },
        where: {
          id: updateWorkshopInput.id,
        },
      });
      const sections = await tx.workshop
        .findUniqueOrThrow({
          where: { id: updateWorkshopInput.id },
        })
        .sections();
      if (!sections || !sections.length) {
        await tx.workshopSection.create({
          data: { workshopId: updateWorkshopInput.id },
        });
      }
    });
    return this.prismaService.workshop.findUniqueOrThrow({
      where: { id: updateWorkshopInput.id },
    });
  }
}
