import Database from "./DatabaseInterface";
import connectToDatabase from '@/isaac/database/mongoose/MongooseProvider';
import { Page } from './mongoose/models/index'
import type { IPage } from '../models/index';

async function init() {
  console.log('Initializing Mongoose connection to MongoDB...');
  return await connectToDatabase();
}

const databaseConnection = await init();
console.log(databaseConnection ? 'Mongoose database initialized' : 'Mongoose database failed to initialize');

const mongooseDatabase: Database = {
  getPage: async (id: string) => {
    const page: IPage[] = await Page.find({ _id: id });

    return page[0];
  },

  // getUser: (id: string) => {
  //   return Promise.resolve({
  //     ...MockUser,
  //     id: id
  //   });
  // },

  // search: (options?: any) => {
  //   return Promise.resolve([MockPage]);
  // }
};

export default mongooseDatabase;