import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Entry from '../models/entry';
import { EntryController } from './../controllers/entry.controller';
import { EntryService } from './../services/entry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [EntryService],
  controllers: [EntryController],
  exports: [EntryService],
})
export class EntryModule {}
