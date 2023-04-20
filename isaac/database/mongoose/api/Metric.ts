import { Metric } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";

export const MetricModelAPI: ModelAPI<Metric> = {
    get: async (query: any, sort: any) => {
        try {
            const data = await MongooseModels.Metric
                .find(query)
                .sort(sort);

            const metrics = data.map((raw) => {
                const metric: Metric = {
                    met_page_id: raw.id,
                    created_at: raw.created_at,
                    major: raw.major,
                    standing: raw.standing
                };

                return metric;
            }) ?? [];
    
            return {
                success: true,
                payload: metrics
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    add: async (m: Metric) => {
        try {
            const met = new MongooseModels.Metric(m);
            await met.validate();
            await met.save();

            return {
                success: true,
                payload: met
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
    
    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => {
        try {
            const data = await MongooseModels.Metric
                .aggregate()
                .group(groupOptions)
                .sort(sortOptions)
                .lookup(lookupOptions);
            
            return {
                success: true,
                payload: data
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    update: async (id: string, attributes: Partial<Metric>) => { throw new Error("Not implemented"); },
    delete: async (id: string) => { throw new Error("Not implemented"); }
}
