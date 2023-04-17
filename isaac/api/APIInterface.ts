import type { Page, Revision, Category, User } from '@/isaac/models';
import { CategoryRequest } from '../models/Category';
import { PageRequest } from '../models/Page';
import { RevisionRequest } from '../models/Revision';
import { SearchResponse } from '../search/SearchInterface';

export default interface API {
    // pages
    /**
     * Gets the pages based on the given parameters
     * @param get_type REQUIRED
     * @param sort_type REQUIRED
     * @param get_options DEPENDS on get_type
     */
    getPages(get_type: GetPageTypes, sort_type: SortType, get_options?: GetPageOptions): Promise<Page | Page[]>,
    // TODO: deprecate in v2.0
    getAllPages(): Promise<Page[]>,
    getPagesByCategoryId(c_id: string): Promise<Page[]>,
    getPageById(p_id: string): Promise<Page>,  // @deprecate in v2.0
    getPageByTitle(p_title: string): Promise<Page>,
    getPageBySlug(slug: string): Promise<Page>,
    getTrendingPages(): Promise<Page[]>,
    // =================
    addNewPage(p: PageRequest): Promise<Page>,
    deletePage(p_id: string): Promise<boolean>

    // revisions
    /**
     * Gets the revisions based on the given parameters
     * @param get_type REQUIRED
     * @param sort_type REQUIRED
     * @param get_options DEPENDS on get_type
     */
    getRevisions(get_type: GetRevisionTypes, sort_type: SortType, get_options?: GetRevisionOptions): Promise<Revision | Revision[]>,
    // TODO: deprecate in v2.0
    getRecentPageRevisionById(p_id: string): Promise<Revision>,
    getAllPageRevisionsById(p_id: string): Promise<Revision[]>,
    getRevisionById(r_id: string): Promise<Revision>,
    getRecentPageRevisionByName(ref_page_name: string): Promise<Revision>,  // TODO: take out
    // =================
    addRevision(r: RevisionRequest): Promise<Revision>,
    deleteRevision(r_id: string): Promise<boolean>,

    // categories
    /**
     * Gets the categories based on the given parameters
     * @param get_type REQUIRED
     * @param sort_type REQUIRED
     * @param get_options DEPENDS on get_type
     */
    getCategories(get_type: GetCategoryTypes, sort_type: SortType, get_options?: GetCategoryOptions): Promise<Category | Category[]>,
    // TODO: deprecate in v2.0
    getAllCategories(): Promise<Category[]>,
    getCategoryById(c_id: string): Promise<Category>,
    getCategoryByName(c_name: string): Promise<Category>,
    // =================
    addNewCategory(c: CategoryRequest): Promise<Category>,
    deleteCategoryAndPages(c_id: string): Promise<boolean>,

    // only needed for the firebase auth flavor
    getUserByEmail(email: string): Promise<User>,
    addNewUser(u: User): Promise<User>,
    updateUser(u: User): Promise<string>,

    search(q: string): Promise<SearchResponse>,
}

export enum GetPageTypes {
    PAGE_BY_ID,
    PAGES_BY_CATEGORY_ID,
    PAGES_BY_TITLE,
    PAGE_BY_SLUG,
    TRENDING_PAGES,
    ALL_PAGES
}

export interface GetPageOptions {
    c_id?: string;
    p_id?: string;
    p_title?: string;
    p_slug?: string;
}

export enum SortType {
    ALPHABETICAL,
    RECENTLY_CREATED,
    NONE
}

export enum GetRevisionTypes {
    ALL_REVISIONS_OF_PAGE_ID,
    RECENT_REVISION_OF_PAGE_ID,
    REVISION_BY_REVISION_ID
}

export interface GetRevisionOptions {
    p_id?: string;
    r_id?: string;
    ref_page_name?: string;
}

export enum GetCategoryTypes {
    ALL_CATEGORIES,
    CATEGORY_BY_ID,
    CATEGORY_BY_NAME
}

export interface GetCategoryOptions {
    c_id?: string;
    c_name?: string;
}