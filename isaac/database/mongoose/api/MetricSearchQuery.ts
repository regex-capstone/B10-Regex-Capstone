import { MetricSearchQuery } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";
import { ServerMetricSearchQueryRequest } from "@/isaac/models/MetricSearchQuery";
import mongoose from "mongoose";

export const MetricSearchQueryAPI: ModelAPI<MetricSearchQuery, ServerMetricSearchQueryRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.MetricSearchQuery
                .find(options)
                .sort(sort);

            const payload: MetricSearchQuery[] = data.map((raw) => {
                return {
                    created_at: raw.created_at,
                    search_query: raw.search_query,
                };
            });

            return {
                success: true,
                payload: payload
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    add: async (serverRequest: ServerMetricSearchQueryRequest) => {
        try {
            const payload = new MongooseModels.MetricSearchQuery(serverRequest);
            await payload.validate();
            await payload.save();

            const newMetricSearchQuery = {
                ...payload._doc,
                id: (payload._id as mongoose.Types.ObjectId).toString()
            };

            delete newMetricSearchQuery._id;

            return {
                success: true,
                payload: newMetricSearchQuery
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
    
    aggregate: async (...agg_args: any[]) => { throw new Error('Not implemented'); },
    update: async (id: string, attributes: Partial<MetricSearchQuery>) => { throw new Error('Not implemented'); },    
    delete: async (options: any) => {
        try {
            const response = await MongooseModels.MetricSearchQuery.deleteMany(options);
            return {
                success: response.acknowledged ?? false,
                payload: response.deletedCount ?? 0
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    }
}