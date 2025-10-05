import { Country } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

class BranchAddressResponseDto {
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

export class BranchResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  addressId: number;

  @Expose()
  @Type(() => BranchAddressResponseDto)
  address: BranchAddressResponseDto;
}
