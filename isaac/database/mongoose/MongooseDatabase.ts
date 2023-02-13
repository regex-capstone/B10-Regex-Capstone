 import type { Page, Revision, Category } from '../../models/index';
import Database from "../DatabaseInterface";
import MongooseModels from './MongooseModels';
import connectToDatabase from './MongooseProvider';

async function init() {
    console.log('Initializing Mongoose connection to MongoDB...');
    return await connectToDatabase();
}

const databaseConnection = await init();
console.log(databaseConnection ? 'Mongoose database initialized' : 'Mongoose database failed to initialize');

const MongooseDatabase: Database = {
    getLatestPages: async (query: Object) => {
        const pages: Page[] = await MongooseModels.Page
            .find(query)
            .sort({ created_at: -1 });

        return {
            success: true,
            payload: pages
        };
    },

    getLatestRevisions: async (query: Object) => {
        const revs: Revision[] = await MongooseModels.Revision
            .find(query)
            .sort({ created_at: -1 });

        return {
            success: true,
            payload: revs
        };
    },

    getLatestCategories: async (query: Object) => {
        const cats: Category[] = await MongooseModels.Category
            .find(query)
            .sort({ created_at: -1 });

        return {
            success: true,
            payload: cats
        };
    },

    addPage: async (p: Page) => {
        console.log(p);
        const page = new MongooseModels.Page(p);
        await page.save((err: string | undefined, res: any) => {
            if (err) throw new Error(err);
            console.log(res);
        });

        return {
            success: true,
            payload: page._id.toString()
        }
    },

    addRevision: async (r: Revision) => {
        const rev = new MongooseModels.Revision(r);
        await rev.save((err: string | undefined, res: any) => {
            if (err) throw new Error(err);
        });

        return {
            success: true,
            payload: rev._id.toString()
        }
    },

    addCategory: async (c: Category) => {
        const cat = new MongooseModels.Category(c);
        await cat.save((err: string | undefined, res: any) => {
            if (err) throw new Error(err);
            console.log(res);
        });

        return {
            success: true,
            payload: cat._id.toString()
        }
    }
};

export default MongooseDatabase;