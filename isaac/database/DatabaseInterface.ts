import type { Page, Revision, Category } from '../models/index';

export default interface Database {
    getLatestPages(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestRevisions(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestCategories(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    addPage(page: Page): Promise<SuccessDBResponse | ErrorDBResponse>,
    addRevision(rev: Revision): Promise<SuccessDBResponse | ErrorDBResponse>,
    addCategory(cat: Category): Promise<SuccessDBResponse | ErrorDBResponse>,
    // @TODO: search(options?: any): Promise<Page[]>,
}

interface SuccessDBResponse {
    success: boolean,
    payload?: string |
        Page | Page[] |
        Revision | Revision[] |
        Category | Category[]
}

interface ErrorDBResponse {
    error: Error
}

export function isErrorResponse(res: any): res is ErrorDBResponse {
    return 'error' in res;
}