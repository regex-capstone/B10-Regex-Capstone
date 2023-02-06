import Page from "../models/Page"
import User from "../models/User"
import Metric from "../models/Metric"

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