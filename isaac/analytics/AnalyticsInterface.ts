import type { Metric } from '../analytics/model';
export default interface Analytics {
    getAnalytics(p_id: string): Promise<Metric[]>,
    getAllAnalytics(): Promise<string>,
    addAnalytic(m: Metric): Promise<Metric>
}