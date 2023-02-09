import type { Page, User } from '../models/index';
import Revision from '../models/Revision';

export default interface Database {
  getPages(p_id?: string): Promise<Page[]>,
  addPage(page: Page): Promise<string>,
  getRevisionsByPId(p_id: string): Promise<Revision[]>,
  getRevisionByRId(r_id: string): Promise<Revision>,
  addRevision(rev: Revision): Promise<string>
  // getUser(id: string): Promise<User>,

  // search(options?: any): Promise<Page[]>,
}