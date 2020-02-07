import {Sequelize} from 'sequelize-typescript';
import { Promise } from 'bluebird';


export const sequelize = new Sequelize({
 storage: './database.db',
 dialect: 'sqlite',
 models: [__dirname + '/models/**/*.ts'],
 logging: false
});

