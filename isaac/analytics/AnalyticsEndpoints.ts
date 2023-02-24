import { Metric } from '../analytics/model';
import IsaacAPI from "../ISAAC";

const AnalyticsAPI = {
    async addAnalytic(m: Metric) {
        return (await IsaacAPI.addAnalytic({
            ...m,
            timestamp: Date.now()
        }));
    },

    async getAnalytics(p_id: string, major: string, standing: string) {
        return (await IsaacAPI.getAnalytics({ id: p_id, major: major, standing: standing, single: true })) as Metric[];
    },

    async getAllAnalytics() {
        return (await IsaacAPI.getAnalytics({ })) as Metric[];
    }
}