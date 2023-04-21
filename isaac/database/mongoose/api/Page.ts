import { Page } from '@/isaac/models';
import { ModelAPI } from '../../DatabaseInterface';
import MongooseModels from '../MongooseModels';
import convert, { LOWERCASE_TRANSFORMER } from 'url-slug';
import mongoose from 'mongoose';
import { ServerPageRequest } from '@/isaac/models/Page';

export const PageModelAPI: ModelAPI<Page, ServerPageRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const data = await MongooseModels.Page
                .find(options)
                .sort(sort);

            const pages = data.map((raw) => {
                return {
                    id: (raw._id as mongoose.Types.ObjectId).toString(),
                    title: raw.title,
                    page_category_id: raw.page_category_id,
                    created_at: raw.created_at,
                    description: raw.description ?? ''
                };
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

    add: async (serverRequest: ServerPageRequest) => {
        try {
            const page = new MongooseModels.Page({
                ...serverRequest,
                page_category_id: new mongoose.Types.ObjectId(serverRequest.page_category_id)
            });

            page.slug = convert(`${page.title} ${page._id}`, {
                separator: '-',
                transformer: LOWERCASE_TRANSFORMER
            });
            
            await page.validate();
            await page.save();

            const newPage = {
                ...page,
                id: (page._id as mongoose.Types.ObjectId).toString()
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

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => { throw new Error('Not implemented'); }
}
