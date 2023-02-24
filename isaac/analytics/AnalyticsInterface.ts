import type { Metric } from '../analytics/model';
export default interface Analytics {
    getAnalytics(p_id: string, major: string, standing: string): Promise<Metric[]>,
    getAllAnalytics(): Promise<Metric[]>,
    addAnalytic(m: Metric): Promise<string>
}