import { Page } from '@/isaac/models';
import { ModelAPI } from '../../DatabaseInterface';
import MongooseModels from '../MongooseModels';
import convert, { LOWERCASE_TRANSFORMER } from 'url-slug';

export const PageModelAPI: ModelAPI<Page> = {
    get: async (query: any, sort: any) => {
        try {
            const data = await MongooseModels.Page
                .find(query)
                .sort(sort);

            const pages = data.map((raw) => {
                const page: Page = {
                    id: raw._id,
                    title: raw.title,
                    page_category_id: raw.page_category_id,
                    created_at: raw.created_at,
                    description: raw.description ?? ''
                };

                return page;
            });
    
            return {
                success: true,
                payload: pages
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    add: async (p: Page) => {
        try {
            const page = new MongooseModels.Page(p);
            const pageId = page._doc._id;

            page.slug = convert(`${page.title} ${pageId}`, {
                separator: '-',
                transformer: LOWERCASE_TRANSFORMER
            });
            
            await page.validate();
            await page.save();

            const newPage = {
                ...page._doc,
                id: pageId.toString()
            };

            delete newPage._id;


            return {
                success: true,
                payload: newPage
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    delete: async (id: string) => {
        try {
            const response = await MongooseModels.Page.deleteOne({ _id: id });
            return {
                success: response.acknowledged ?? false
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    // TODO: verify that this works
    update: async (id: string, attributes: Partial<Page>) => {
        try {
            const page = await MongooseModels.Page.updateOne({ _id: id }, attributes);

            return {
                success: true,
                payload: page
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => {
        try {
            const data = await MongooseModels.Page
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
    }
}
