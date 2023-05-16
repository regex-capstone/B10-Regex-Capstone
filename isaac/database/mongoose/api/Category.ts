import { Category } from '@/isaac/models';
import { ModelAPI } from '../../DatabaseInterface';
import MongooseModels from '../MongooseModels';
import mongoose from 'mongoose';
import { ServerCategoryRequest } from '@/isaac/models/Category';
import convert, { LOWERCASE_TRANSFORMER } from 'url-slug';

export const CategoryModelAPI: ModelAPI<Category, ServerCategoryRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.Category
                .find(options)
                .sort(sort);

            const cats = data.map((raw) => {
                return {
                    id: (raw._id as mongoose.Types.ObjectId).toString(),
                    name: raw.name,
                    created_at: raw.created_at,
                    slug: raw.slug
                };
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

            cat.slug = convert(`${cat.name} ${cat._id}`, {
                separator: '-',
                transformer: LOWERCASE_TRANSFORMER
            });

            await cat.validate();
            await cat.save();

            const newCat = {
                ...cat._doc,
                id: (cat._id as mongoose.Types.ObjectId).toString()
            };

            delete newCat._id;
    
            return {
                success: true,
                payload: newCat
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    delete: async (options: any) => {
        try {
            const response = await MongooseModels.Category.deleteMany(options);
            return {
                success: response.acknowledged ?? false,
                payload: response.deletedCount ?? 0
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    update: async (id: string, attributes: Partial<Category>) => {
        try {
            attributes.slug = convert(`${attributes.name} ${id}`, {
                separator: '-',
                transformer: LOWERCASE_TRANSFORMER
            });
            
            const updated = await MongooseModels.Category.updateOne({ _id: id }, attributes);
            return {
                success: true,
                payload: updated
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => { throw new Error('Not implemented'); }
}
