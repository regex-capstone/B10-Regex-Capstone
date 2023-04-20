import mongoose from 'mongoose';
import { Page, Revision, Category, User, Metric } from '../../models/index';

export const PageSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Title is missing...'] 
    },
    page_category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'Category reference is missing...'],
        ref: 'Category' 
    },
    created_at: { 
        type: Date, 
        required: [true, 'Creation date is missing...']
    },
    description: {
        type: String,
        required: [true, 'Description is missing...']
    },
    slug: {
        type: String,
        required: [true, 'Slug is missing...']
    }
}, { strict: true });

export const RevisionSchema = new mongoose.Schema({
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
}, { strict: true });

export const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is missing...'] 
    },
    created_at: {
        type: Date,
        required: [true, 'Creation date is missing...'] 
    }
    
}, { strict: true });

export const MetricSchema = new mongoose.Schema({
    met_page_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    created_at: {
        type: Date,
        required: [true, 'Date missing...']
    }
}, { strict: true });

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is missing...'],
    },
    role: {
        type: String,
        required: [true, 'Role is missing...'],
    },
    name: {
        type: String,
        required: [true, 'Name is missing...']
    },
    standing: {
        type: String,
        required: [true, 'Standing is missing...']
    },
    major: {
        type: String,
        required: [true, 'Major is missing...']
    }
}, { strict: true });

export default {
    Page: mongoose.models.Page || mongoose.model<Page>('Page', PageSchema),
    Revision: mongoose.models.Revision || mongoose.model<Revision>('Revision', RevisionSchema),
    Category: mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema),
    Metric: mongoose.models.Metric || mongoose.model<Metric>('Metric', MetricSchema),
    User: mongoose.models.User || mongoose.model<User>('User', UserSchema)
}