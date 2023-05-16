import MetricPageFeedback, { ClientMetricPageFeedbackRequest, ServerMetricPageFeedbackRequest } from "@/isaac/models/MetricPageFeedback";
import { SortType } from "../SortType";
import ISAACAPI from "@/isaac/ISAACAPI";
import { MetricPageFeedbackSortOptions } from "@/isaac/api/MetricPageFeedback";

export default interface MetricPageFeedbackPublicAPIInterface {
    get(get_type: GetMetricPageFeedbackTypes, 
        sort_type: SortType, 
        get_options?: GetMetricPageFeedbackOptions): Promise<MetricPageFeedback | MetricPageFeedback[]>,
    add(clientRequest: ClientMetricPageFeedbackRequest): Promise<MetricPageFeedback>,
    delete(options: any): Promise<any>
}

export enum GetMetricPageFeedbackTypes {
    ALL_METRIC_PAGE_FEEDBACK,
    METRIC_PAGE_FEEDBACK_BY_PAGE
}

export interface GetMetricPageFeedbackOptions {
    p_id?: string;
}

const isaac = ISAACAPI;

export const MetricPageFeedbackPublicAPI: MetricPageFeedbackPublicAPIInterface = {
    get: async (get_type: GetMetricPageFeedbackTypes, sort_type: SortType, get_options?: GetMetricPageFeedbackOptions) => {
        let sort_options: MetricPageFeedbackSortOptions = {};

        switch (sort_type) {
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;

            default:
                throw new Error("Invalid sort type.");
        }

        switch (get_type) {
            case GetMetricPageFeedbackTypes.ALL_METRIC_PAGE_FEEDBACK:
                return (await isaac.MetricPageFeedback.get({}, sort_options)) as MetricPageFeedback[];
                
            case GetMetricPageFeedbackTypes.METRIC_PAGE_FEEDBACK_BY_PAGE:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.MetricPageFeedback.get({ page: get_options?.p_id }, sort_options)) as MetricPageFeedback[];

            default:
                throw new Error('Invalid get type.');
        }
    },

    add: async (clientRequest: ClientMetricPageFeedbackRequest) => {
        const serverRequest: ServerMetricPageFeedbackRequest = {
            ...clientRequest,
            created_at: Date.now()
        };

        const MetricPageFeedback: MetricPageFeedback = await isaac.MetricPageFeedback.add(serverRequest);

        if (!MetricPageFeedback) throw new Error('Failed to add metric page click.');

        return MetricPageFeedback;
    },

    delete: async (options: any) => {
        return await isaac.MetricPageFeedback.delete(options);
    }
}