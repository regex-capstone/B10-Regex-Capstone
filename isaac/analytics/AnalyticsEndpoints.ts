import { SearchMetric, Metric} from '../analytics/model';
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
    },

    async addSearch(s: SearchMetric) {
        return (await IsaacAPI.addSearch({
            ...s,
            created_at: Date.now()
        })) as string;
    },

    async getSearchHistory() {
        return (await IsaacAPI.getSearchHistory({ })) as SearchMetric[];
    }
}

export default AnalyticsAPI