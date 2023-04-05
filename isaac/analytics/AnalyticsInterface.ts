import type { Metric, SearchMetric } from '../analytics/model';
export default interface Analytics {
    getAnalytics(p_id: string): Promise<Metric[]>,
    getAllAnalytics(): Promise<Metric[]>,
    addAnalytic(m: Metric): Promise<string>,
    addSearch(s: SearchMetric): Promise<string>,
    getSearchHistory(): Promise<SearchMetric[]>
}