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
                    page: raw.page
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
                page: new mongoose.Types.ObjectId(serverRequest.page)
            });
            await payload.validate();
            await payload.save();

            const newMetricPageClick = {
                ...payload._doc,
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
    
    aggregate: async (...agg_args: any) => {
        try {
            return {
                success: true,
                payload: await MongooseModels.MetricPageClick.aggregate(agg_args)
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    update: async (id: string, attributes: Partial<MetricPageClick>) => { throw new Error('Not implemented'); },
    
    delete: async (options: any) => {
        try {
            const response = await MongooseModels.MetricPageClick.deleteMany(options);
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