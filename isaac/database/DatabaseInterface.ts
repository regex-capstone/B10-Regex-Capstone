import type { Page, Revision, Category, User } from '../models/index';
import type { Metric, SearchMetric } from '../analytics/model'

export default interface Database {
    getLatestPages(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestRevisions(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestCategories(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,

    addPage(page: Page): Promise<SuccessDBResponse | ErrorDBResponse>,
    addRevision(rev: Revision): Promise<SuccessDBResponse | ErrorDBResponse>,
    addCategory(cat: Category): Promise<SuccessDBResponse | ErrorDBResponse>,
    
    updatePage(id: string, query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    
    deletePage(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,

    getAnalytics(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    addAnalytic(metric: Metric): Promise<SuccessDBResponse | ErrorDBResponse>
    
    // only needed for the firebase auth flavor
    getLatestUsers(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    addNewUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>,
    updateUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>,

    // search metrics
    addSearchMetric(metric: SearchMetric): Promise<SuccessDBResponse | ErrorDBResponse>,
    getSearches(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>
}

interface SuccessDBResponse {
    success: boolean,
    payload?: string |
        Page | Page[] |
        Revision | Revision[] |
        Category | Category[] |
        Metric | Metric[] |
        User | User[] |
        SearchMetric | SearchMetric[]
}

interface ErrorDBResponse {
    error: Error
}

export function isErrorResponse(res: any): res is ErrorDBResponse {
    return 'error' in res;
}