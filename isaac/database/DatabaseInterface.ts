import type { Page, Revision, Category, User, Metric, MetricPageClick, MetricSearchQuery, MetricPageFeedback } from '../models/index';

/**
 * The database API interface for the ISAAC API.
 * Can use other databases as long as they adhere with this
 * interface.
 * 
 * CURRENT: MongoDB w/ Mongoose
 */
export default interface DatabaseAPI {
    Page: ModelAPI<Page>,
    Revision: ModelAPI<Revision>,
    Category: ModelAPI<Category>,
    User: ModelAPI<User>,
    Metric: ModelAPI<Metric>,
    MetricPageClick: ModelAPI<MetricPageClick>,
    // MetricSearchQuery: ModelAPI<MetricSearchQuery>,
    // MetricPageFeedback: ModelAPI<MetricPageFeedback>
}

/**
 * Each database model should have the following methods
 * at least initialized in the code.
 */
export interface ModelAPI<K> {
    get: (query: any, sort: any) => Promise<SuccessDBResponse | ErrorDBResponse>,
    add: (item: K) => Promise<SuccessDBResponse | ErrorDBResponse>,
    delete: (id: string) => Promise<SuccessDBResponse | ErrorDBResponse>,
    update: (id: string, attributes: Partial<K>) => Promise<SuccessDBResponse | ErrorDBResponse>,
    aggregate: (groupOptions: any, sortOptions: any, lookupOptions: any) => Promise<SuccessDBResponse | ErrorDBResponse>
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