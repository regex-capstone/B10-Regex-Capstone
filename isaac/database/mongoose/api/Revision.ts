import { Revision } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import mongoose from "mongoose";
import MongooseModels from "../MongooseModels";

export const RevisionModelAPI: ModelAPI<Revision> = {
    get: async (query: any, sort: any) => {
        try {
            const data = await MongooseModels.Revision
                .find(query)
                .sort(sort);

            const revs = data.map((raw) => {
                const rev: Revision = {
                    id: raw._id,
                    content: raw.content,
                    created_at: raw.created_at,
                    rev_page_id: raw.rev_page_id
                };

                return rev;
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

    add: async (r: Revision) => {
        try {
            const rev = new MongooseModels.Revision(r);
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

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => {
        try {
            const data = await MongooseModels.Revision
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

    update: (id: string, attributes: Partial<Revision>) => { throw new Error('Not implemented') }
}
