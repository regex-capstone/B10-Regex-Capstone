import API from "../api/APIInterface";
import Page from "../models/Page";
import User from "../models/User";
import MockIsaac from "./MockIsaac";

const MockAPI: API = {
  async getPage(id): Promise<Page> {
    return MockIsaac.getPage(id);
  },

  async search(options: any): Promise<Page[]> {
    return [];
  },

  async getUser(id: string): Promise<User> {
    return MockIsaac.getUser(id);
  },

  async getMetrics(options: any): Promise<any> {
    return {};
  }
}

export default MockAPI;