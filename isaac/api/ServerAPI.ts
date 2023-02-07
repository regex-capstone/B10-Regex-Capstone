import type { IPage, IUser } from '../models/index';
import type API from "./APIInterface";
import IsaacAPI from "../IsaacAPI";

const ServerAPI: API = {
  async getPage(id): Promise<IPage> {
    return IsaacAPI.getPage(id);
  },

  async search(options: any): Promise<IPage[]> {
    return [];
  },

  // async getUser(id: string): Promise<IUser> {
  //   return IsaacAPI.getUser(id);
  // },

  // async getMetrics(options: any): Promise<any> {
  //   return {};
  // }
}

export default ServerAPI;