import Page from "../models/IPage"
import User from "../models/IUser"
import Metric from "../models/IMetric"

export default interface API {
  getPage(id: string): Promise<Page>,
  search(options: SearchOptions): Promise<Page[]>,
  getUser(id: string): Promise<User>,
  getMetrics(options?: MetricsOptions): Promise<Metric>,
}

export interface SearchOptions {
  query?: string,
  categories?: string[],
}

export interface MetricsOptions {
  id: string,
  type: string,
}