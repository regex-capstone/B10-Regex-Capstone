import type { IPage, IUser, IMetric } from '@/isaac/models';

export default interface API {
  getPage(id: string): Promise<IPage>,
  search(options: SearchOptions): Promise<IPage[]>,
  // getUser(id: string): Promise<User>,
  // getMetrics(options?: MetricsOptions): Promise<IMetric>,
}

export interface SearchOptions {
  query?: string,
  categories?: string[],
}

export interface MetricsOptions {
  id: string,
  type: string,
}