import { Country, Position, Role } from '@prisma/client';
import { Expose, Transform, Type } from 'class-transformer';

class EmployeeAddressResponseDto {
  @Expose()
  street: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  zipCode: string;

  @Expose()
  country: Country;
}

export class EmployeeResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.user?.email, { toPlainOnly: true })
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.firstName, { toPlainOnly: true })
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.lastName, { toPlainOnly: true })
  lastName: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.role, { toPlainOnly: true })
  role: Role;

  @Expose()
  salary: number;

  @Expose()
  @Type(() => Date)
  hireDate: Date;

  @Expose()
  position: Position;

  @Expose()
  departmentId: number;

  @Expose()
  @Type(() => EmployeeAddressResponseDto)
  address: EmployeeAddressResponseDto;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
