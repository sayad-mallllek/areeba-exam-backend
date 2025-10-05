import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @Transform(({ value }) => value?.trim())
  name: string;
}
