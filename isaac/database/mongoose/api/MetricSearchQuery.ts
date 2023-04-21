import { MetricSearchQuery } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";
import { ServerMetricSearchQueryRequest } from "@/isaac/models/MetricSearchQuery";

export const MetricSearchQueryAPI: ModelAPI<MetricSearchQuery> = {
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

            return {
                success: true,
                payload: payload
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
    
    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => {
        try {
            return {
                success: true,
                payload: await MongooseModels.MetricSearchQuery
                    .aggregate()
                    .group(groupOptions)
                    .sort(sortOptions)
                    .lookup(lookupOptions)
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    update: async (id: string, attributes: Partial<MetricSearchQuery>) => { throw new Error('Not implemented'); },
    delete: async (id: string) => { throw new Error('Not implemented'); }
}