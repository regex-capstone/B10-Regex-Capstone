import type { Page, User, Metric, Revision } from '@/isaac/models';

export default interface API {
  getPages(): Promise<Page[]>,
  getPage(p_id: string): Promise<Page>,
  getRecentPageRevision(p_id: string): Promise<Revision>,
  addNewPage(p: Page): Promise<string>,
  getPageRevisions(p_id: string): Promise<Revision[]>,
  getRevision(r_id: string): Promise<Revision>,
  updateLatestPageRevision(p_id: string, content: string): Promise<string>
  // search(options: SearchOptions): Promise<Page[]>,
  // getUser(id: string): Promise<User>,
  // getMetrics(options?: MetricsOptions): Promise<Metric>,
}

export interface SearchOptions {
  query?: string,
  categories?: string[],
}

export interface MetricsOptions {
  id: string,
  type: string,
}
