import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { EntryModule } from './app/modules/entry.module';
import UserModule from './app/modules/user.module';
import * as ormOptions from './config/orm';

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), AuthModule, UserModule, EntryModule],
  controllers: [],
})
export class AppModule {}
