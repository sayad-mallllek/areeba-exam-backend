import { Expose } from 'class-transformer';

export class DepartmentResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
