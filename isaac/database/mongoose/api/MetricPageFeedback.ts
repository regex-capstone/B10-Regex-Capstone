import { MetricPageFeedback } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";
import mongoose from "mongoose";
import { ServerMetricPageFeedbackRequest } from "@/isaac/models/MetricPageFeedback";

export const MetricPageFeedbackAPI: ModelAPI<MetricPageFeedback> = {
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

    add: async (serverRequest: ServerMetricPageFeedbackRequest) => {
        try {
            const payload = new MongooseModels.MetricPageFeedback({
                ...serverRequest,
                page_id: new mongoose.Types.ObjectId(serverRequest.page_id)
            });
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
                payload: await MongooseModels.MetricPageFeedback
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

    update: async (id: string, attributes: Partial<MetricPageFeedback>) => { throw new Error('Not implemented'); },
    delete: async (id: string) => { throw new Error('Not implemented'); }
}