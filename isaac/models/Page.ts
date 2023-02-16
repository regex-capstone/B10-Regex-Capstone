import Revision from './Revision';

export default interface Page {
    id: string;
    title: string;
    page_category_id: string;
    created_at?: number;
}