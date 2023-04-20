import { ServerCategoryRequest } from '../models/Category';
import { ServerPageRequest } from '../models/Page';
import { ServerRevisionRequest } from '../models/Revision';
import type { Page, Revision, Category, User, Metric } from '../models/index';

/**
 * The database API interface for the ISAAC API.
 * Can use other databases as long as they adhere with this
 * interface.
 * 
 * CURRENT: MongoDB w/ Mongoose
 */
export default interface DatabaseAPI {
    Page: ModelAPI<Page, ServerPageRequest>,
    Revision: ModelAPI<Revision, ServerRevisionRequest>,
    Category: ModelAPI<Category, ServerCategoryRequest>,
    // User: ModelAPI<User>,
    // Metric: ModelAPI<Metric>
}

/**
 * Each database model should have the following methods
 * at least initialized in the code.
 */
export interface ModelAPI<X, Y> {
    get: (query: any, sort: any) => Promise<SuccessDBResponse | ErrorDBResponse>,
    add: (item: Y) => Promise<SuccessDBResponse | ErrorDBResponse>,
    delete: (id: string) => Promise<SuccessDBResponse | ErrorDBResponse>,
    update: (id: string, attributes: Partial<X>) => Promise<SuccessDBResponse | ErrorDBResponse>,
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