import { Revision } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import mongoose from "mongoose";
import MongooseModels from "../MongooseModels";
import { ServerRevisionRequest } from "@/isaac/models/Revision";

export const RevisionModelAPI: ModelAPI<Revision, ServerRevisionRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.Revision
                .find(options)
                .sort(sort);

            const revs: Revision[] = data.map((raw) => {
                return {
                    id: raw._id.toString(),
                    content: raw.content,
                    created_at: raw.created_at,
                    rev_page_id: raw.rev_page_id
                };
            });
    
            return {
                success: true,
                payload: revs
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    add: async (request: ServerRevisionRequest) => {
        try {
            const rev = new MongooseModels.Revision({
                ...request,
                rev_page_id: new mongoose.Types.ObjectId(request.rev_page_id)
            });
            await rev.validate();
            await rev.save();
    
            return {
                success: true,
                payload: rev
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    delete: async (id: string) => {
        try {
            const response = await MongooseModels.Revision.deleteOne({ _id: id });
            return {
                success: response.acknowledged ?? false
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => { throw new Error('Not implemented') },
    update: (id: string, attributes: Partial<Revision>) => { throw new Error('Not implemented') }
}
