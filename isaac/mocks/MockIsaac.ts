import Database from "../database/DatabaseInterface";
import MockDatabase from "./MockDatabase";
import Page from "../models/Page";
import User from "../models/User";

const database: Database = MockDatabase;

async function getPage(id: string): Promise<Page> {
  const page: Page = await database.getPage(id);
  return page;
}

async function getUser(id: string): Promise<User> {
  const user: User = await database.getUser(id);
  return user;
}

export default {
  getPage: getPage,
  getUser: getUser,
};