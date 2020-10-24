import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Entry from '../models/entry';
import { EntryController } from './../controllers/entry.controller';
import { EntryService } from './../services/entry.service';
import { CategoryModule } from './category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), CategoryModule],
  providers: [EntryService],
  controllers: [EntryController],
  exports: [EntryService],
})
export class EntryModule {}
