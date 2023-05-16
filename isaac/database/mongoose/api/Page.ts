import { Page } from '@/isaac/models';
import { ModelAPI } from '../../DatabaseInterface';
import MongooseModels from '../MongooseModels';
import convert, { LOWERCASE_TRANSFORMER } from 'url-slug';
import mongoose from 'mongoose';
import { ServerPageRequest } from '@/isaac/models/Page';

export const PageModelAPI: ModelAPI<Page, ServerPageRequest> = {
    get: async (options: any, sort: any) => {
        try {
            const populate: boolean = options.populate ?? false;

            delete options.populate;

            const data = (populate) 
                ? await MongooseModels.Page
                    .find(options)
                    .populate('category')
                    .sort(sort)
                : await MongooseModels.Page
                    .find(options)
                    .sort(sort);

            const pages = data.map((raw) => {
                return {
                    id: (raw._id as mongoose.Types.ObjectId).toString(),
                    title: raw.title,
                    category: raw.category,
                    created_at: raw.created_at,
                    description: raw.description,
                    slug: raw.slug
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
                category: (serverRequest.category) ? new mongoose.Types.ObjectId(serverRequest.category) : null
            });

            page.slug = convert(`${page.title} ${page._id}`, {
                separator: '-',
                transformer: LOWERCASE_TRANSFORMER
            });
            
            await page.validate();
            await page.save();

            const newPage = {
                ...page._doc,
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
    delete: async (options: any) => {
        try {
            const response = await MongooseModels.Page.deleteMany(options);
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
    update: async (slug: string, attributes: Partial<Page>) => {
        try {
            // hack: i'm too lazy rn to figure this out if u wanna figure it out be my guest
            const identifier = slug.split(" ");

            if (attributes.title) { // update the slug
                const getPage = await MongooseModels.Page
                    .find({ slug: slug });
                const page = getPage[0];

                attributes.slug = convert(`${attributes.title} ${page._id}`, {
                    separator: '-',
                    transformer: LOWERCASE_TRANSFORMER
                });
            }

            let updated;

            if (identifier.length > 1) {
                updated = await MongooseModels.Page.updateOne({ _id: identifier[1] }, attributes);

            } else {
                updated = await MongooseModels.Page.updateOne({ slug: slug }, attributes);
            }

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
