import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/integrations/database/database.module';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
