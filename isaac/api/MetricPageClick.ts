import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import MetricPageClick, { ServerMetricPageClickRequest } from "../models/MetricPageClick";

export interface MetricPageClickOptions extends BaseOptions {
    p_id?: string;
}

export interface MetricPageClickSortOptions {
    created_at?: number;
}

const database = MongooseDatabaseAPI;

export const MetricPageClickAPI = {
    get: async (options: MetricPageClickOptions, sort: MetricPageClickSortOptions) => {
        const query = cleanOptions(options);

        const response = (await database.MetricPageClick.get(query, sort)); 

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as MetricPageClick[];

        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerMetricPageClickRequest) => {
        const response = (await database.MetricPageClick.add(serverRequest));

        if (isErrorResponse(response)) throw response.error;

        const resultMetricPageClick = response.payload as MetricPageClick;

        if (!resultMetricPageClick) throw new Error('Error adding new metric page click.');

        return resultMetricPageClick;
    },

    aggregate: async (...agg_args: any[]) => {
        let response = (await database.MetricPageClick.aggregate(...agg_args));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as MetricPageClick[];

        return payload;
    },

    delete: async (mpc_id: string) => {
        const response = (await database.MetricPageClick.delete(mpc_id));

        if (isErrorResponse(response)) throw response.error;

        return response.success;
    }
};