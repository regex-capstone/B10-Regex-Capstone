 import type { Page, Revision, Category } from '../../models/index';
 import { Metric } from '../../analytics/model'
import Database from "../DatabaseInterface";
import MongooseModels from './MongooseModels';
import connectToDatabase from './MongooseProvider';

async function init() {
    console.log('Initializing Mongoose connection to MongoDB...');
    return await connectToDatabase();
}

try {
    const databaseConnection = await init();
    console.log(databaseConnection ? 'Mongoose database initialized' : 'Mongoose database failed to initialize');
} catch (err) {
    throw err;
}

const MongooseDatabase: Database = {
    getLatestPages: async (query: Object) => {
        try {
            const data = await MongooseModels.Page
                .find(query)
                .sort({ created_at: -1 });

            const pages = data.map((raw) => {
                const page: Page = {
                    id: raw._id,
                    title: raw.title,
                    page_category_id: raw.page_category_id,
                    created_at: raw.created_at,
                    headings: raw.headings ?? []
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

    getLatestRevisions: async (query: Object) => {
        try {
            const data = await MongooseModels.Revision
                .find(query)
                .sort({ created_at: -1 });

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

    getLatestCategories: async (query: Object) => {
        try {
            const data = await MongooseModels.Category
                .find(query)
                .sort({ created_at: -1 });

            const cats = data.map((raw) => {
                const cat: Category = {
                    id: raw._id,
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

    addPage: async (p: Page) => {
        try {
            const page = new MongooseModels.Page(p);
            await page.validate();
            await page.save();

            return {
                success: true,
                payload: page._id.toString()
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
                payload: rev._id.toString()
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
                payload: cat._id.toString()
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
                    timestamp: raw.timestamp,
                    major: raw.major,
                    standing: raw.standing
                };

                return metric;
            });
    
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
    }
};

export default MongooseDatabase;