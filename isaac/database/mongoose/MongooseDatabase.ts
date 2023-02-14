 import type { Page, Revision, Category } from '../../models/index';
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
            const pages: Page[] = await MongooseModels.Page
                .find(query)
                .sort({ created_at: -1 });
    
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
            const revs: Revision[] = await MongooseModels.Revision
                .find(query)
                .sort({ created_at: -1 });
    
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
            const cats: Category[] = await MongooseModels.Category
                .find(query)
                .sort({ created_at: -1 });
    
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
    }
};

export default MongooseDatabase;