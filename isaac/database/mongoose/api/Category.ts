import { Category } from '@/isaac/models';
import { ModelAPI } from '../../DatabaseInterface';
import MongooseModels from '../MongooseModels';
import mongoose from 'mongoose';
import { ServerCategoryRequest } from '@/isaac/models/Category';

export const CategoryModelAPI: ModelAPI<Category> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.Category
                .find(options)
                .sort(sort);

            const cats = data.map((raw) => {
                const cat: Category = {
                    id: (raw._id as mongoose.Types.ObjectId).toString(),
                    name: raw.name,
                    created_at: raw.created_at
                };

                return cat;
            });
    
            return {
                success: true,
                payload: cats
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    add: async (serverRequest: ServerCategoryRequest) => {
        try {
            const cat = new MongooseModels.Category(serverRequest);
            await cat.validate();
            await cat.save();
    
            return {
                success: true,
                payload: cat
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    delete: async (id: string) => {
        try {
            const response = await MongooseModels.Category.deleteOne({ _id: id });
            return {
                success: response.acknowledged ?? false
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => { throw new Error('Not implemented'); },
    update: (id: string, attributes: Partial<Category>) => { throw new Error('Not implemented'); }
}
