import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/integrations/database/database.module';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
