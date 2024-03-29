import { MetricPageClick } from "@/isaac/models";
import { SortType } from '@/isaac/public/SortType';
import ISAACAPI from "@/isaac/ISAACAPI";
import { MetricPageClickSortOptions } from "@/isaac/api/MetricPageClick";
import { ClientMetricPageClickRequest, ServerMetricPageClickRequest } from "@/isaac/models/MetricPageClick";

export default interface MetricPageClickPublicAPIInterface {
    get(get_type: GetMetricPageClickTypes, 
        sort_type: SortType, 
        get_options?: GetMetricPageClickOptions): Promise<MetricPageClick | MetricPageClick[]>,
    add(clientRequest: ClientMetricPageClickRequest): Promise<MetricPageClick>,
    aggregate(agg_type: MetricPageClickAggType): Promise<any>,
    delete(options: any): Promise<any>
}

export enum GetMetricPageClickTypes {
    ALL_METRIC_PAGE_CLICKS,
    METRIC_PAGE_CLICKS_BY_PAGE
}

export enum MetricPageClickAggType {
    TRENDING_PAGES
}

export interface GetMetricPageClickOptions {
    p_id?: string;
}

const isaac = ISAACAPI;

export const MetricPageClickPublicAPI: MetricPageClickPublicAPIInterface = {
    get: async (get_type: GetMetricPageClickTypes, sort_type: SortType, get_options?: GetMetricPageClickOptions) => {
        let sort_options: MetricPageClickSortOptions = {};

        switch (sort_type) {
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;

            default:
                throw new Error("Invalid sort type.");
        }

        switch (get_type) {
            case GetMetricPageClickTypes.ALL_METRIC_PAGE_CLICKS:
                return (await isaac.MetricPageClick.get({}, sort_options)) as MetricPageClick[];
                
            case GetMetricPageClickTypes.METRIC_PAGE_CLICKS_BY_PAGE:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.MetricPageClick.get({ page: get_options?.p_id }, sort_options)) as MetricPageClick[];

            default:
                throw new Error('Invalid get type.');
        }
    },

    add: async (clientRequest: ClientMetricPageClickRequest) => {
        const serverRequest: ServerMetricPageClickRequest = {
            ...clientRequest,
            created_at: Date.now()
        };

        const metricPageClick: MetricPageClick = await isaac.MetricPageClick.add(serverRequest);

        if (!metricPageClick) throw new Error('Failed to add metric page click.');

        return metricPageClick;
    },

    aggregate: async (type: MetricPageClickAggType) => {
        let response;

        switch (type) {
            case MetricPageClickAggType.TRENDING_PAGES:
                response = (await isaac.MetricPageClick.aggregate(
                    {
                        $group: {
                            _id: '$page',
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            count: -1
                        }
                    },
                    {
                        $lookup: {
                            from: 'pages',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'page'
                        }
                    }));
                break;
            default:
                throw new Error('Invalid aggregation type.');
        }

        return response
    },

    delete: async (options: any) => {
        return (await isaac.MetricPageClick.delete(options));
    }
}