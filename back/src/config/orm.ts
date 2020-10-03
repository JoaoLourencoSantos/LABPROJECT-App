import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/projeto.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'app', 'models', '*')],
  synchronize: true,
};

module.exports = options;
