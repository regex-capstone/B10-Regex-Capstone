import mongoose from 'mongoose';
import { Page, Revision, Category } from '../../models';

const MongooseModels = {
    Page: new mongoose.Schema({
        title: String,
        created_at: Date,
        page_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    }),

    Revision: new mongoose.Schema({
        content: String,
        created_at: Date,
        rev_page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }
    }),

    Category: new mongoose.Schema({
        name: String,
        created_at: Date
    })
}

export default {
    Page: mongoose.models.Page || mongoose.model<Page>('Page', MongooseModels.Page),
    Revision: mongoose.models.Revision || mongoose.model<Revision>('Revision', MongooseModels.Revision),
    Category: mongoose.models.Category || mongoose.model<Category>('Category', MongooseModels.Category)
}