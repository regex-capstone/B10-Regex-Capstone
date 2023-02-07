import type Database from "./database/DatabaseInterface";
import mongooseDatabase from "./database/MongooseDatabase";
import Page from "./models/IPage";
import User from "./models/IUser";

const database: Database = mongooseDatabase;

async function getPage(id: string): Promise<Page> {
  const page: Page = await database.getPage(id);
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