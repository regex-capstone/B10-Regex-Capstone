import { Metric } from "@/isaac/models";
import { SortType } from "../PublicAPI";
import ISAACAPI from "@/isaac/ISAACAPI";

export default interface MetricPublicAPIInterface {
    get(get_type: GetMetricTypes, sort_type: SortType, get_options?: GetMetricOptions): Promise<Metric[] | Metric>;
    add(m: Metric): Promise<Metric>;
}

export enum GetMetricTypes {
    ALL_METRICS,
    METRICS_OF_PAGE_ID
}

export interface GetMetricOptions {
    p_id?: string;
}

const isaac = ISAACAPI;

export const MetricPublicAPI: MetricPublicAPIInterface = {
    get: async (get_type: GetMetricTypes, sort_type: SortType, get_options?: GetMetricOptions) => {
        let sort_options: any = {};

        switch (sort_type) {
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;
            default:
                throw new Error("Invalid sort type.");
        }

        switch (get_type) {
            case GetMetricTypes.ALL_METRICS:
                return (await isaac.Metric.get({}, sort_options)) as Metric[];

            case GetMetricTypes.METRICS_OF_PAGE_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.Metric.get({ met_page_id: get_options?.p_id }, sort_options)) as Metric[];

            default:
                throw new Error("Invalid get type.");
        }
    },

    add: async (m: Metric) => {
        return (await isaac.Metric.add({
            ...m,
            created_at: Date.now()
        })) as Metric;
    }
}
