import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import MetricPageFeedback, { ServerMetricPageFeedbackRequest } from "../models/MetricPageFeedback";

export interface MetricPageFeedbackOptions extends BaseOptions {
    p_id?: string;  // TODO: change options
}

export interface MetricPageFeedbackSortOptions {
    created_at?: number;
}

const database = MongooseDatabaseAPI;

export const MetricPageFeedbackAPI = {
    get: async (options: MetricPageFeedbackOptions, sort: MetricPageFeedbackSortOptions) => {
        const query = cleanOptions(options);

        const response = (await database.MetricPageFeedback.get(query, sort)); 

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as MetricPageFeedback[];

        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerMetricPageFeedbackRequest) => {
        const response = (await database.MetricPageFeedback.add(serverRequest));

        if (isErrorResponse(response)) throw response.error;

        const resultMetricPageFeedback = response.payload as MetricPageFeedback;

        if (!resultMetricPageFeedback) throw new Error('Error adding new metric page feedback.');

        return resultMetricPageFeedback;
    },

    aggregate: async (...agg_args: any[]) => {
        let response = (await database.MetricPageFeedback.aggregate(...agg_args));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as MetricPageFeedback[];

        return payload;
    },

    delete: async (mpf_id: string) => {
        const response = (await database.MetricPageFeedback.delete(mpf_id));

        if (isErrorResponse(response)) throw response.error;

        return response.success;
    }
};