import { IsOptional, IsInt, IsPositive, IsIn, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @IsIn([10, 20, 50, 100])
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
