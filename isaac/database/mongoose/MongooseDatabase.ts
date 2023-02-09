import type { Page, Revision } from '../../models/index';
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
    getPages: async (p_id?: string) => {
        const pages: Page[] = p_id
            ? await MongooseModels.Page.find({ _id: p_id })
            : await MongooseModels.Page
                .find({})
                .sort({ created_at: -1 });
        return pages;
    },
    addPage: async (p: Page) => {
        p.created_at = Date.now();
        const page = new MongooseModels.Page(p);
        await page.save((err: string | undefined, res: any) => {
            if (err) throw new Error(err);
        });
        return page._id.toString();
    },
    getRevisionsByPId: async (p_id: string) => {
        const revs: Revision[] = await MongooseModels.Revision
            .find({ rev_page_id: p_id })
            .sort({ created_at: -1 });
        return revs;
    },
    getRevisionByRId: async (r_id: string) => {
        const revs: Revision[] = await MongooseModels.Revision
            .find({ _id: r_id })
            .sort({ created_at: -1 });
        return revs[0];
    },
    addRevision: async (r: Revision) => {
        r.created_at = Date.now();
        const rev = new MongooseModels.Revision(r);
        await rev.save((err: string | undefined, res: any) => {
            if (err) throw new Error(err);
        });
        return rev._id.toString();
    }
};

export default MongooseDatabase;