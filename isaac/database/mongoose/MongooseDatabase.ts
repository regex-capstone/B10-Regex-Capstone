import type { Page, Revision, Category } from '../../models/index';
import Metric from '../../analytics/model'
import Database from "../DatabaseInterface";
import MongooseModels from './MongooseModels';
import connectToDatabase from './MongooseProvider';
import { AggregationTypes, UpdatePageOptions } from '@/isaac/ISAACOptions';

try {
    await connectToDatabase();
} catch (err) {
    throw err;
}

const MongooseDatabase: Database = {
    getPages: async (query: any, sort: any) => {
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
                    headings: raw.headings ?? [],
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

    aggregate: async (type: AggregationTypes) => {
        try {
            let data;

            switch (type) {
                case AggregationTypes.TRENDING_PAGES:
                    data = await MongooseModels.Metric
                        .aggregate()
                        .group({
                            _id: '$met_page_id', count: { $sum: 1 }
                        })
                        .sort({ count: -1 })
                        .lookup({
                            from: 'pages',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'page'
                        });
                    break;
            }
    
            return {
                success: true,
                payload: data
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getRevisions: async (query: any, sort: any) => {
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

    getCategories: async (query: any, sort: any) => {
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
            return {
                error: err
            }
        }
    },

    addPage: async (p: Page) => {
        try {
            const page = new MongooseModels.Page(p);
            await page.validate();
            await page.save();
            // TODO; fix this fucking add shit bullshit

            const pageId = page._doc._id;
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

    addRevision: async (r: Revision) => {
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

    addCategory: async (c: Category) => {
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

    updatePage: async (id: string, query: UpdatePageOptions) => {
        try {
            const page = await MongooseModels.Page.findByIdAndUpdate({ _id: id }, query, { new: true });

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

    deletePage: async (id: string) => {
        try {
            await MongooseModels.Page.deleteOne({ _id: id })
            return {
                success: true
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    deleteRevision: async (id: string) => {
        try {
            await MongooseModels.Revision.deleteOne({ _id: id })
            return {
                success: true
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    deleteCategory: async (id: string) => {
        try {
            await MongooseModels.Category.deleteOne({ _id: id })
            return {
                success: true
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getAnalytics: async (query: Object) => {
        try {
            const data = await MongooseModels.Metric
                .find(query);

            const metrics = data.map((raw) => {
                const metric: Metric = {
                    met_page_id: raw.id,
                    created_at: raw.created_at,
                    major: raw.major,
                    standing: raw.standing
                };

                return metric;
            }) ?? [];
    
            return {
                success: true,
                payload: metrics
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addAnalytic: async (m: Metric) => {
        try {
            const met = new MongooseModels.Metric(m);
            await met.validate();
            await met.save();

            return {
                success: true,
                payload: met._id.toString()
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getLatestUsers: async (query: any) => {
        try {
            const data = await MongooseModels.User
                .find(query)
                .sort({ created_at: -1 });

            const users = data.map((raw) => {
                const user = {
                    id: raw._id,
                    role: raw.role,
                    standing: raw.standing,
                    major: raw.major,
                    name: raw.name,
                    email: raw.email
                };
                return user;
            });
    
            return {
                success: true,
                payload: users
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addNewUser: async (user: any) => {
        try {
            const newUser = new MongooseModels.User(user);
            await newUser.validate();
            await newUser.save();
    
            return {
                success: true,
                payload: newUser
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    updateUser: async (user: any) => {
        try {
            const userId = user.id;
            delete user.id;
            
            const updatedUser = await MongooseModels.User.findByIdAndUpdate(userId, user, { new: true });
            
            return {
                success: true,
                payload: updatedUser
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    }
};

export default MongooseDatabase;