import type { Page, Revision, Category, User } from '../models/index';
import type Metric from '../analytics/model'

export default interface Database {
    // READ
    getPages(query: Object, sort: SortOptions): Promise<SuccessDBResponse | ErrorDBResponse>,
    getRevisions(query: Object, sort: SortOptions): Promise<SuccessDBResponse | ErrorDBResponse>,
    getCategories(query: Object, sort: SortOptions): Promise<SuccessDBResponse | ErrorDBResponse>,

    // CREATE
    addPage(page: Page): Promise<SuccessDBResponse | ErrorDBResponse>,
    addRevision(rev: Revision): Promise<SuccessDBResponse | ErrorDBResponse>,
    addCategory(cat: Category): Promise<SuccessDBResponse | ErrorDBResponse>,
    
    // UPDATE
    updatePage(id: string, query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    
    // DELETE
    deletePage(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,
    deleteRevision(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,
    deleteCategory(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,

    // aggregate
    aggMetrics(groupOptions: any, sortOptions: any, lookupOptions: any): Promise<SuccessDBResponse | ErrorDBResponse>,

    getAnalytics(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    addAnalytic(metric: Metric): Promise<SuccessDBResponse | ErrorDBResponse>
    
    // only needed for the firebase auth flavor
    getLatestUsers(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    addNewUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>,
    updateUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>
}

export interface SortOptions {
    created_at?: number
}

interface SuccessDBResponse {
    success: boolean,
    payload?: any
}

interface ErrorDBResponse {
    error: Error
}

export function isErrorResponse(res: any): res is ErrorDBResponse {
    return 'error' in res;
}