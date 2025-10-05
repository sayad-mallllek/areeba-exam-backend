import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DatabaseService } from 'src/integrations/database/database.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentResponseDto } from './dto/department-response.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly database: DatabaseService) {}

  async findAllDepartments(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const departments = await this.database.department.findMany({
      take: limit,
      skip: offset,
    });

    return plainToInstance(DepartmentResponseDto, departments, {
      excludeExtraneousValues: true,
    });
  }

  async findDepartmentById(id: number) {
    const department = await this.database.department.findUnique({
      where: { id },
    });

    return department
      ? plainToInstance(DepartmentResponseDto, department, {
          excludeExtraneousValues: true,
        })
      : null;
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.database.department.create({
      data: {
        name: createDepartmentDto.name,
      },
    });

    return plainToInstance(DepartmentResponseDto, department, {
      excludeExtraneousValues: true,
    });
  }

  async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.database.department.update({
      where: { id },
      data: {
        ...(updateDepartmentDto.name !== undefined && {
          name: updateDepartmentDto.name,
        }),
      },
    });

    return plainToInstance(DepartmentResponseDto, department, {
      excludeExtraneousValues: true,
    });
  }

  async deleteDepartment(id: number) {
    const department = await this.database.department.delete({
      where: { id },
    });

    return plainToInstance(DepartmentResponseDto, department, {
      excludeExtraneousValues: true,
    });
  }
}
