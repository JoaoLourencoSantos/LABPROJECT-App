import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './app/modules/category.module';
import { EntryModule } from './app/modules/entry.module';
import UserModule from './app/modules/user.module';
import { AuthModule } from './auth/auth.module';
import * as ormOptions from './config/orm';

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), AuthModule, UserModule, EntryModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
