import type { Page, User, Revision } from '../models/index';
import type API from "./APIInterface";
import IsaacAPI from "../IsaacAPI";

const ServerAPI: API = {
  async getPages() {
    return await IsaacAPI.getPages();
  },
  async getPage(p_id: string) {
    return await IsaacAPI.getPageById(p_id)
  },
  async getRecentPageRevision(p_id: string) {
    return (await IsaacAPI.getRevisionsByPId(p_id))[0]
  },
  async addNewPage(p: Page) {
    // add a new page
    const pageId: string = await IsaacAPI.addNewPage(p);

    if (!pageId) {
      throw new Error('Error adding new page.');
    }
  
    // start the page's first revision
    const revId: string = await IsaacAPI.addNewRevision(pageId, '');
  
    if (!revId) {
      throw new Error('Error adding new revision.');
    }
  
    return pageId;
  },
  async getPageRevisions(p_id: string) {
    return await IsaacAPI.getRevisionsByPId(p_id);
  },
  async getRevision(r_id: string) {
    return await IsaacAPI.getRevisionByRId(r_id);
  },
  async updateLatestPageRevision(p_id: string, content: string) {
    return await IsaacAPI.addNewRevision(p_id, content);
  }
}

export default ServerAPI;