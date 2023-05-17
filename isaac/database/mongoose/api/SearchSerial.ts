
import { SearchSerial } from "@/isaac/models";
import mongoose from "mongoose";
import MongooseModels from "../MongooseModels";
import { ModelAPI } from "../../DatabaseInterface";
import { ServerSearchSerialRequest } from "@/isaac/models/SearchSerial";

export const SearchSerialAPI: ModelAPI<SearchSerial, ServerSearchSerialRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.SearchSerial
                .find(options)
                .sort(sort);

            const payload: SearchSerial[] = data.map((raw) => {
                return {
                    id: raw._id.toString(),
                    page_ids: raw.page_ids,
                    tfidf_serial: raw.tfidf_serial,
                    created_at: raw.created_at,
                }
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

    add: async (serverRequest: ServerSearchSerialRequest) => {
        try {
            const payload = new MongooseModels.SearchSerial(serverRequest);
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
    update: async (id: string, attributes: Partial<SearchSerial>) => { throw new Error('Not implemented'); },    
    delete: async (options: any) => {
        try {
            const response = await MongooseModels.SearchSerial.deleteMany(options);
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