import type { Page, Revision, Category, User } from '../models/index';

export default interface Database {
    getLatestPages(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestRevisions(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestCategories(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    addPage(page: Page): Promise<SuccessDBResponse | ErrorDBResponse>,
    addRevision(rev: Revision): Promise<SuccessDBResponse | ErrorDBResponse>,
    addCategory(cat: Category): Promise<SuccessDBResponse | ErrorDBResponse>,
    // only needed for the firebase auth flavor
    getLatestUsers(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    addNewUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>
}

interface SuccessDBResponse {
    success: boolean,
    payload?: string |
        Page | Page[] |
        Revision | Revision[] |
        Category | Category[] |
        User | User[]
}

interface ErrorDBResponse {
    error: Error
}

export function isErrorResponse(res: any): res is ErrorDBResponse {
    return 'error' in res;
}