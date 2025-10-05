import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './integrations/database/database.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './api/users/users.module';
import { EmployeesModule } from './api/employees/employees.module';
import { BranchesModule } from './api/branches/branches.module';
import { DepartmentsModule } from './api/departments/departments.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    EmployeesModule,
    BranchesModule,
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
