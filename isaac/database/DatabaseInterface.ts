import type { Page, Revision, Category } from '../models/index';

export default interface Database {
    getLatestPages(query: Object): Promise<DatabaseResponse>,
    getLatestRevisions(query: Object): Promise<DatabaseResponse>,
    getLatestCategories(query: Object): Promise<DatabaseResponse>,
    addPage(page: Page): Promise<DatabaseResponse>,
    addRevision(rev: Revision): Promise<DatabaseResponse>,
    addCategory(cat: Category): Promise<DatabaseResponse>,
    // search(options?: any): Promise<Page[]>,
}

export interface DatabaseResponse {
    success: boolean,
    payload?: string |
        Page | Page[] |
        Revision | Revision[] |
        Category | Category[]
}