import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { MetricSearchQuery } from "../models";
import { ServerMetricSearchQueryRequest } from "../models/MetricSearchQuery";

export interface MetricSearchQueryOptions extends BaseOptions {
}

export interface MetricSearchQuerySortOptions {
    created_at?: number;
}

const database = MongooseDatabaseAPI;

export const MetricSearchQueryAPI = {
    get: async (options: MetricSearchQueryOptions, sort: MetricSearchQuerySortOptions) => {
        const query = cleanOptions(options);

        const response = (await database.MetricSearchQuery.get(query, sort)); 

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as MetricSearchQuery[];

        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerMetricSearchQueryRequest) => {
        const response = (await database.MetricSearchQuery.add(serverRequest));

        if (isErrorResponse(response)) throw response.error;

        const resultMetricSearchQuery = response.payload as MetricSearchQuery;

        if (!resultMetricSearchQuery) throw new Error('Error adding new metric page click.');

        return resultMetricSearchQuery;
    },

    aggregate: async (...agg_args: any[]) => {
        let response = (await database.MetricSearchQuery.aggregate(...agg_args));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as MetricSearchQuery[];

        return payload;
    },

    delete: async (mpc_id: string) => {
        const response = (await database.MetricSearchQuery.delete(mpc_id));

        if (isErrorResponse(response)) throw response.error;

        return response.success;
    }
};