import ISAACAPI from "@/isaac/ISAACAPI"
import { SortType } from "../SortType"
import { MetricSearchQuery } from "@/isaac/models";
import { ClientMetricSearchQueryRequest, ServerMetricSearchQueryRequest } from "@/isaac/models/MetricSearchQuery";

export default interface MetricSearchQueryPublicAPIInterface {
    get(get_type: GetMetricSearchQueryTypes, 
        sort_type: SortType, 
        get_options?: GetMetricSearchQueryOptions): Promise<MetricSearchQuery | MetricSearchQuery[]>,
    add(clientRequest: ClientMetricSearchQueryRequest): Promise<MetricSearchQuery>
}

export enum GetMetricSearchQueryTypes {
    ALL_METRIC_SEARCH_QUERY
}

export interface GetMetricSearchQueryOptions {
}

const isaac = ISAACAPI;

export const MetricSearchQueryPublicAPI: MetricSearchQueryPublicAPIInterface = {
    get: async (get_type: GetMetricSearchQueryTypes, sort_type: SortType, get_options?: GetMetricSearchQueryOptions) => {
        let sort_options: any = {};

        switch (sort_type) {
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;

            default:
                throw new Error("Invalid sort type.");
        }

        switch (get_type) {
            case GetMetricSearchQueryTypes.ALL_METRIC_SEARCH_QUERY:
                return (await isaac.MetricSearchQuery.get({}, sort_options)) as MetricSearchQuery[];

            default:
                throw new Error('Invalid get type.');
        }
    },

    add: async (clientRequest: ClientMetricSearchQueryRequest) => {
        const serverRequest: ServerMetricSearchQueryRequest = {
            ...clientRequest,
            created_at: Date.now()
        };

        const MetricSearchQuery: MetricSearchQuery = await isaac.MetricSearchQuery.add(serverRequest);

        if (!MetricSearchQuery) throw new Error('Failed to add metric search query.');

        return MetricSearchQuery;
    }
}
