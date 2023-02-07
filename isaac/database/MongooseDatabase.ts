import type { IPage } from '../models/index';
import Database from "./DatabaseInterface";
import { Page } from './mongoose/models/index';
import connectToDatabase from './mongoose/MongooseProvider';

async function init() {
  console.log('Initializing Mongoose connection to MongoDB...');
  return await connectToDatabase();
}

const databaseConnection = await init();
console.log(databaseConnection ? 'Mongoose database initialized' : 'Mongoose database failed to initialize');

const MongooseDatabase: Database = {
  getPage: async (id: string) => {
    const page: IPage[] = await Page.find({ _id: id });

    return page[0];
  },

  // getUser: (id: string) => {
  //   return Promise.resolve({s
  //     ...MockUser,
  //     id: id
  //   });
  // },

  // search: (options?: any) => {
  //   return Promise.resolve([MockPage]);
  // }
};

export default MongooseDatabase;