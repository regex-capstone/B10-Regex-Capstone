import { ModelAPI } from "../../DatabaseInterface";
import MetricPageClick, { ServerMetricPageClickRequest } from "@/isaac/models/MetricPageClick";
import MongooseModels from "../MongooseModels";
import mongoose from "mongoose";

export const MetricPageClickAPI: ModelAPI<MetricPageClick, ServerMetricPageClickRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.MetricPageClick
                .find(options)
                .sort(sort);

            const payload: MetricPageClick[] = data.map((raw) => {
                return {
                    created_at: raw.created_at,
                    page_id: raw.page_id
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

    add: async (serverRequest: ServerMetricPageClickRequest) => {
        try {
            const payload = new MongooseModels.MetricPageClick({
                ...serverRequest,
                page_id: new mongoose.Types.ObjectId(serverRequest.page_id)
            });
            await payload.validate();
            await payload.save();

            const newMetricPageClick = {
                ...payload,
                id: (payload._id as mongoose.Types.ObjectId).toString()
            };

            delete newMetricPageClick._id;

            return {
                success: true,
                payload: newMetricPageClick
            };
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
                payload: await MongooseModels.MetricPageClick
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

    update: async (id: string, attributes: Partial<MetricPageClick>) => { throw new Error('Not implemented'); },
    
    delete: async (id: string) => {
        try {
            const response = await MongooseModels.MetricPageClick.deleteOne({_id: id});
            return {
                success: response.acknowledged ?? false,
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    }
}