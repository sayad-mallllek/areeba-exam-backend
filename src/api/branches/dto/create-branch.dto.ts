import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Country } from '@prisma/client';

class BranchAddressDto {
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

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BranchAddressDto)
  address: BranchAddressDto;
}
