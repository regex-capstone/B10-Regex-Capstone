import mongoose from 'mongoose';
import Page from '@/isaac/models/Page';
import Revision from '../../models/Revision';

const pageSchema = new mongoose.Schema({
    title: String,
    created_at: Date,
})

const revisionSchema = new mongoose.Schema({
    content: String,
    created_at: Date,
    rev_page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }
})

export default {
    Page: mongoose.models.Page || mongoose.model<Page>('Page', pageSchema),
    Revision: mongoose.models.Revision || mongoose.model<Revision>('Revision', revisionSchema),
}