import Metric from '../analytics/model';
import Analytics from '../analytics/AnalyticsInterface';
import IsaacAPI from "../ISAAC";

const AnalyticsAPI: Analytics = {
    async addAnalytic(m: Metric) {
        return (await IsaacAPI.addAnalytic({
            ...m,
            created_at: Date.now()
        })) as string;
    },

    async getAnalytics(p_id: string) {
        return (await IsaacAPI.getAnalytics({ met_page_id: p_id })) as Metric[];
    },

    async getAllAnalytics() {
        return (await IsaacAPI.getAnalytics({ })) as Metric[];
    }
}

export default AnalyticsAPI