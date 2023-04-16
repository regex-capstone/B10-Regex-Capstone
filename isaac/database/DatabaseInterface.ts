import type { Page, Revision, Category, User } from '../models/index';
import type Metric from '../analytics/model'
import { AggregationTypes } from '../ISAACOptions';

export default interface Database {
    // READ
    /**
     * GET pages from the database
     * @param query filter object to apply to the query
     * @param sort sort object to apply to the query
     */
    getPages(query: any, sort: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    /**
     * GET revisions from the database
     * @param query filter object to apply to the query
     * @param sort sort object to apply to the query
     */
    getRevisions(query: any, sort: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    /**
     * GET categories from the database
     * @param query filter object to apply to the query
     * @param sort sort object to apply to the query
     */
    getCategories(query: any, sort: any): Promise<SuccessDBResponse | ErrorDBResponse>,

    // CREATE
    /**
     * ADD a new page in the database
     * @param page new page object to be stored
     */
    addPage(page: Page): Promise<SuccessDBResponse | ErrorDBResponse>,
    /**
     * ADD a new revision in the database
     * @param rev new revision object to be stored
     */
    addRevision(rev: Revision): Promise<SuccessDBResponse | ErrorDBResponse>,
    /**
     * ADD a new category in the database
     * @param cat new cateogory object to be stored
     */
    addCategory(cat: Category): Promise<SuccessDBResponse | ErrorDBResponse>,
    
    // UPDATE
    /**
     * UPDATE a page in the database
     * @param id the page id to update
     * @param query the properties of the page to update
     */
    updatePage(id: string, query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    
    // DELETE
    /**
     * DELETE a page from the database
     * @param id the id of the page to delete
     */
    deletePage(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,
    /**
     * DELETE a revision from the database
     * @param id the id of the revision to delete
     */
    deleteRevision(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,
    /**
     * DELETE a category from the database
     * @param id the id of the category to delete
     */
    deleteCategory(id: string): Promise<SuccessDBResponse | ErrorDBResponse>,

    // aggregate
    /**
     * AGGREGATE metrics from the database
     * @param groupOptions group options for the aggregation
     * @param sortOptions sort options for the aggregation
     * @param lookupOptions populate model references with the model object(s)
     */
    aggregate(type: AggregationTypes): Promise<SuccessDBResponse | ErrorDBResponse>,

    getAnalytics(query: Object): Promise<SuccessDBResponse | ErrorDBResponse>,
    addAnalytic(metric: Metric): Promise<SuccessDBResponse | ErrorDBResponse>
    
    // only needed for the firebase auth flavor
    getLatestUsers(query: any): Promise<SuccessDBResponse | ErrorDBResponse>,
    addNewUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>,
    updateUser(user: User): Promise<SuccessDBResponse | ErrorDBResponse>
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