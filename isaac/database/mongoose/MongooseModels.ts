import mongoose from 'mongoose';
import { Page, Revision, Category } from '../../models';
import { Metric } from '../../analytics/model';

const MongooseModels = {
    Page: new mongoose.Schema({
        title: { 
            type: String,
            required: [true, 'Title is missing...'] 
        },
        headings: {
            type: Array, 
            "default": []
        },
        page_category_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: [true, 'Category reference is missing...'],
            ref: 'Category' 
        },
        created_at: { 
            type: Date, 
            required: [true, 'Creation date is missing...']
        }
    }, { strict: true }),

    Revision: new mongoose.Schema({
        content: {
            type: String,
            required: [true, 'Content is missing...'] 
        },
        rev_page_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: [true, 'Page reference is missing...'],
            ref: 'Page' 
        },
        created_at: {
            type: Date,
            required: [true, 'Creation date is missing...'] 
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
    }, { strict: true }),

    Metric: new mongoose.Schema({
        met_page_id: {
            type: String,
            required: [true, 'Page reference ID is missing...']
        },
        major: {
            type: String,
            required: [true, 'Major is missing...']
        },
        standing: {
            type: String,
            required: [true, 'Standing is missing...']
        },
        timestamp: {
            type: Date,
            required: [true, 'Date missing...']
        }
    }, { strict: true })
}

export default {
    Page: mongoose.models.Page || mongoose.model<Page>('Page', MongooseModels.Page),
    Revision: mongoose.models.Revision || mongoose.model<Revision>('Revision', MongooseModels.Revision),
    Category: mongoose.models.Category || mongoose.model<Category>('Category', MongooseModels.Category),
    Metric: mongoose.models.Metric || mongoose.model<Metric>('Metric', MongooseModels.Metric)
}