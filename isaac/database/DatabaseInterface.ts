import Page from "../models/Page";
import User from "../models/User";

export default interface Database {
  getPage(id: string): Promise<Page>,
  getUser(id: string): Promise<User>,

  search(options?: any): Promise<Page[]>,
}