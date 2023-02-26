import type { Page, Revision, Category } from '../models/index';
import type Metric from '../analytics/model'

export default interface Database {
    getLatestPages(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestRevisions(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    getLatestCategories(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    addPage(page: Page): Promise<SuccessDBResponse | ErrorDBResponse>,
    addRevision(rev: Revision): Promise<SuccessDBResponse | ErrorDBResponse>,
    addCategory(cat: Category): Promise<SuccessDBResponse | ErrorDBResponse>,
    getAnalytics(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    addAnalytic(metric: Metric): Promise<SuccessDBResponse | ErrorDBResponse>
}

interface SuccessDBResponse {
    success: boolean,
    payload?: string |
        Page | Page[] |
        Revision | Revision[] |
        Category | Category[] |
        Metric | Metric[]
}

interface ErrorDBResponse {
    error: Error
}

export function isErrorResponse(res: any): res is ErrorDBResponse {
    return 'error' in res;
}