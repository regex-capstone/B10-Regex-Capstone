import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { Metric } from "../models";

export interface MetricOptions extends BaseOptions {
    met_page_id?: string;
    major?: string;
    standing?: string;
    single?: boolean;
}

export interface MetricSortOptions {
    created_at?: number;
}

export enum MetricAggType {
    TRENDING_PAGES
}

const database = MongooseDatabaseAPI;

export const MetricAPI = {
    get: async (options: MetricOptions, sort: MetricSortOptions) => {
        const query = cleanOptions(options);

        let response = (await database.Metric.get(query, sort));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as Metric[];

        return options.single ? payload[0] : payload;
    },

    add: async (m: Metric) => {
        const response = (await database.Metric.add(m));

        if (isErrorResponse(response)) throw response.error;

        const resultMet = response.payload as Metric;

        if (!resultMet) throw new Error('Error adding new metric.');

        return resultMet;
    },

    aggregate: async (type: MetricAggType) => {
        let response;

        switch (type) {
            case MetricAggType.TRENDING_PAGES:
                response = (await database.Metric.aggregate(
                    { _id: '$met_page_id', count: { $sum: 1 } },
                    { count: -1 },
                    { from: 'pages', localField: '_id', foreignField: '_id', as: 'page' }
                ));
                break;
            default:
                throw new Error('Invalid aggregation type.');
        }

        if (isErrorResponse(response)) throw response.error;

        return response.payload;
    }
}
