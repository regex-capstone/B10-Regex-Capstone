import { Metric, Metrics } from '../analytics/model';
export default interface Analytics {
    getAnalytics(p_id: string): Promise<Metrics>,
    getAllAnalytics(): Promise<string>,
    addAnalytic(p_id: string): Promise<Metric>
}