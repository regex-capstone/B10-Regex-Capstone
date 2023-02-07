import type { IPage, IUser } from './models/index';
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/MongooseDatabase';

const database: Database = MongooseDatabase;

async function getPage(id: string): Promise<IPage> {
  const page: IPage = await database.getPage(id);
  return page;
}

// async function getUser(id: string): Promise<User> {
//   const user: User = await database.getUser(id);
//   return user;
// }

export default {
  getPage: getPage,
  // getUser: getUser,
};