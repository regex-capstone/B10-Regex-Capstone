import { ServerCategoryRequest } from '../models/Category';
import { ServerMetricPageClickRequest } from '../models/MetricPageClick';
import { ServerMetricPageFeedbackRequest } from '../models/MetricPageFeedback';
import { ServerMetricSearchQueryRequest } from '../models/MetricSearchQuery';
import { ServerPageRequest } from '../models/Page';
import { ServerRevisionRequest } from '../models/Revision';
import SearchSerial, { ServerSearchSerialRequest } from '../models/SearchSerial';
import { ServerUserRequest } from '../models/User';
import type { Page, Revision, Category, User, MetricPageClick, MetricSearchQuery, MetricPageFeedback } from '../models/index';

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
    User: ModelAPI<User, ServerUserRequest>,
    MetricPageClick: ModelAPI<MetricPageClick, ServerMetricPageClickRequest>,
    MetricSearchQuery: ModelAPI<MetricSearchQuery, ServerMetricSearchQueryRequest>,
    MetricPageFeedback: ModelAPI<MetricPageFeedback, ServerMetricPageFeedbackRequest>,
    SearchSerial: ModelAPI<SearchSerial, ServerSearchSerialRequest>
}

/**
 * Each database model should have the following methods
 * at least initialized in the code.
 */
export interface ModelAPI<K, T> {
    get: (options: any, sort: any) => Promise<SuccessDBResponse | ErrorDBResponse>,
    add: (serverRequest: T) => Promise<SuccessDBResponse | ErrorDBResponse>,
    delete: (options: any) => Promise<SuccessDBResponse | ErrorDBResponse>,
    update: (id: string, attributes: Partial<K>) => Promise<SuccessDBResponse | ErrorDBResponse>,
    aggregate: (...agg_args: any[]) => Promise<SuccessDBResponse | ErrorDBResponse>
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