import { MetricPageFeedback } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";
import mongoose from "mongoose";
import { ServerMetricPageFeedbackRequest } from "@/isaac/models/MetricPageFeedback";

export const MetricPageFeedbackAPI: ModelAPI<MetricPageFeedback, ServerMetricPageFeedbackRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.MetricPageFeedback
                .find(options)
                .sort(sort);

            const payload: MetricPageFeedback[] = data.map((raw) => {
                return {
                    created_at: raw.created_at,
                    is_helpful: raw.is_helpful,
                    user_feedback: raw.user_feedback,
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
    add: async (serverRequest: ServerMetricPageFeedbackRequest) => {
        try {
            const payload = new MongooseModels.MetricPageFeedback({
                ...serverRequest,
                page: new mongoose.Types.ObjectId(serverRequest.page)
            });
            await payload.validate();
            await payload.save();

            const newMetricPageFeedback = {
                ...payload._doc,
                id: (payload._id as mongoose.Types.ObjectId).toString()
            };

            delete newMetricPageFeedback._id;

            return {
                success: true,
                payload: newMetricPageFeedback
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
    
    aggregate: async (...agg_args: any[]) => {
        try {
            return {
                success: true,
                payload: await MongooseModels.MetricPageFeedback.aggregate(agg_args)
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
    update: async (id: string, attributes: Partial<MetricPageFeedback>) => { throw new Error('Not implemented'); },    
    delete: async (options: any) => {
        try {
            const response = await MongooseModels.MetricPageFeedback.deleteMany(options);
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