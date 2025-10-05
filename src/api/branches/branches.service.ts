import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DatabaseService } from 'src/integrations/database/database.service';
import { BranchResponseDto } from './dto/branch-response.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly database: DatabaseService) {}

  async findAllBranches(pagination: PaginationDto) {
    const { limit, offset } = pagination;
    const branches = await this.database.branch.findMany({
      take: limit,
      skip: offset,
      include: {
        address: true,
      },
    });

    return plainToInstance(BranchResponseDto, branches, {
      excludeExtraneousValues: true,
    });
  }

  async findBranchById(id: number) {
    const branch = await this.database.branch.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });

    return branch
      ? plainToInstance(BranchResponseDto, branch, {
          excludeExtraneousValues: true,
        })
      : null;
  }

  async createBranch(createBranchDto: CreateBranchDto) {
    const { name, address } = createBranchDto;

    const branch = await this.database.branch.create({
      data: {
        name,
        address: {
          create: { ...address },
        },
      },
      include: {
        address: true,
      },
    });

    return plainToInstance(BranchResponseDto, branch, {
      excludeExtraneousValues: true,
    });
  }

  async updateBranch(id: number, updateBranchDto: UpdateBranchDto) {
    const { name, address } = updateBranchDto;

    const branch = await this.database.branch.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(address && {
          address: {
            update: {
              ...address,
            },
          },
        }),
      },
      include: {
        address: true,
      },
    });

    return plainToInstance(BranchResponseDto, branch, {
      excludeExtraneousValues: true,
    });
  }

  async deleteBranch(id: number) {
    const branch = await this.database.branch.delete({
      where: { id },
      include: {
        address: true,
      },
    });

    return plainToInstance(BranchResponseDto, branch, {
      excludeExtraneousValues: true,
    });
  }
}
