import { Metric, Metrics } from '../analytics/model';
import IsaacAPI from "../ISAAC";

const AnalyticsAPI = {
    async addAnalytic(m: Metric, p_id: string) {
        return (await IsaacAPI.addAnalytic({
            ...m,
            timestamp: Date.now()
        }, { id: p_id, single: true }));
    },

    async getAnalytics(p_id: string) {
        return (await IsaacAPI.getAnalytics({ id: p_id, single: true })) as Metrics;
    },

    async getAllAnalytics() {
        return (await IsaacAPI.getAnalytics({ })) as Metrics[];
    }
}