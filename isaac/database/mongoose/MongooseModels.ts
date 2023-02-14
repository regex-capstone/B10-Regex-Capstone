import mongoose from 'mongoose';
import { Page, Revision, Category } from '../../models';

const MongooseModels = {
    Page: new mongoose.Schema({
        title: { 
            type: String,
            required: [true, 'Title is missing...'] 
        },
        created_at: { 
            type: Date, 
            required: [true, 'Creation date is missing...']
        },
        page_category_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: [true, 'Category reference is missing...'],
            ref: 'Category' 
        }
    }, { strict: true }),

    Revision: new mongoose.Schema({
        content: {
            type: String,
            required: [true, 'Content is missing...'] 
        },
        created_at: {
            type: Date,
            required: [true, 'Creation date is missing...'] 
        },
        rev_page_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: [true, 'Page reference is missing...'],
            ref: 'Page' 
        }
    }, { strict: true }),

    Category: new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Name is missing...'] 
        },
        created_at: {
            type: Date,
            required: [true, 'Creation date is missing...'] 
        }
    }, { strict: true })
}

export default {
    Page: mongoose.models.Page || mongoose.model<Page>('Page', MongooseModels.Page),
    Revision: mongoose.models.Revision || mongoose.model<Revision>('Revision', MongooseModels.Revision),
    Category: mongoose.models.Category || mongoose.model<Category>('Category', MongooseModels.Category)
}