import { Category } from '@/isaac/models';
import { ModelAPI } from '../../DatabaseInterface';
import MongooseModels from '../MongooseModels';

export const CategoryModelAPI: ModelAPI<Category> = {
    get: async (query: any, sort: any) => {
        try {
            const data = await MongooseModels.Category
                .find(query)
                .sort(sort);

            const cats = data.map((raw) => {
                const cat: Category = {
                    id: raw._doc._id,
                    name: raw._doc.name,
                    created_at: raw._doc.created_at
                };

                return cat;
            });
    
            return {
                success: true,
                payload: cats
            };
        } catch (err: any) {

            console.log(err);
            return {
                error: err
            }
        }
    },

    add: async (c: Category) => {
        try {
            const cat = new MongooseModels.Category(c);
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
    
    update: (id: string, attributes: Partial<Category>) => { throw new Error('Not implemented') }
}
