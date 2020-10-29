import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Goal from '../models/goal';
import { GoalController } from './../controllers/goal.controller';
import { GoalService } from './../services/goal.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  providers: [GoalService],
  controllers: [GoalController],
  exports: [GoalService],
})
class GoalModule {}
export default GoalModule;
