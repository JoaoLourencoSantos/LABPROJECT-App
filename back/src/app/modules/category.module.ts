import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Category from '../models/category';
import { CategoryService } from '../services/category.service';
import { CategoryController } from './../controllers/category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [CategoryService],})
export class CategoryModule {}
