import mongoose from 'mongoose';
import { Page, Revision, Category, User, MetricPageClick } from '../../models/index';
import MetricPageFeedback from '../../models/MetricPageFeedback';
import MetricSearchQuery from '../../models/MetricSearchQuery';

const PageSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Title is missing...'] 
    },
    headings: {
         type: Array, 
        "default": []
    },
    category: { 
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

const RevisionSchema = new mongoose.Schema({
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

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is missing...'] 
    },
    created_at: {
        type: Date,
        required: [true, 'Creation date is missing...'] 
    },
    slug: {
        type: String,
        required: [true, 'Slug is missing...']
    }
}, { strict: true });

const UserSchema = new mongoose.Schema({
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

const MetricPageClickSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        required: [true, 'Date missing...']
    },
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Page reference ID is missing...']
    }
}, { strict: true });

const MetricPageFeedbackSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        required: [true, 'Date missing...']
    },
    is_helpful: {
        type: Boolean,
        required: [true, 'Helpfulness is missing...']
    },
    user_feedback: {
        type: String,
        required: [true, 'Feedback is missing...']
    },
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Page reference ID is missing...']
    }
}, { strict: true });

const MetricSearchQuerySchema = new mongoose.Schema({
    created_at: {
        type: Date,
        required: [true, 'Date missing...']
    },
    search_query: {
        type: String,
        required: [true, 'Search query is missing...']
    }
}, { strict: true });

export default {
    Page: mongoose.models.Page || mongoose.model<Page>('Page', PageSchema),
    Revision: mongoose.models.Revision || mongoose.model<Revision>('Revision', RevisionSchema),
    Category: mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema),
    User: mongoose.models.User || mongoose.model<User>('User', UserSchema),
    MetricPageClick: mongoose.models.MetricPageClick || mongoose.model<MetricPageClick>('MetricPageClick', MetricPageClickSchema),
    MetricPageFeedback: mongoose.models.MetricPageFeedback || mongoose.model<MetricPageFeedback>('MetricPageFeedback', MetricPageFeedbackSchema),
    MetricSearchQuery: mongoose.models.MetricSearchQuery || mongoose.model<MetricSearchQuery>('MetricSearchQuery', MetricSearchQuerySchema)
}