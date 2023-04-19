import Metric from '../analytics/model';
import Analytics from '../analytics/AnalyticsInterface';
import ISAACAPI from '../ISAACAPI';
import { SortType } from '../public/PublicAPI';

const isaac = ISAACAPI;

// TODO: handle
const AnalyticsAPI: Analytics = {
    async addAnalytic(m: Metric) {
        return (await isaac.Metric.add({
            ...m,
            created_at: Date.now()
        })) as string;
    },

    async getAnalytics(p_id: string) {
        return (await isaac.Metric.get({ met_page_id: p_id }, {})) as Metric[];
    },

    async getAllAnalytics() {
        return (await isaac.Metric.get({}, {})) as Metric[];
    }
}

export default AnalyticsAPI