import { Country, Position, Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  salary: number;

  @IsNotEmpty()
  @IsISO8601()
  @Transform(({ value }) => value && new Date(value))
  hireDate: Date;

  @IsNotEmpty()
  @IsEnum(Position)
  position: Position;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  departmentId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  branchId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  zipCode: string;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;
}

export class AddressDto {}
