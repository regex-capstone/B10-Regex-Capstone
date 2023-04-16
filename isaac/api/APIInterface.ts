import type { Page, Revision, Category, User } from '@/isaac/models';
import { CategoryRequest } from '../models/Category';
import { PageRequest } from '../models/Page';
import { RevisionRequest } from '../models/Revision';
import { SearchResponse } from '../search/SearchInterface';

export default interface API {
    // pages 
    getAllPages(): Promise<Page[]>,
    getPagesByCategoryId(c_id: string): Promise<Page[]>,
    getPageById(p_id: string): Promise<Page>,
    getPageByTitle(p_title: string): Promise<Page>,
    getTrendingPages(): Promise<Page[]>,
    addNewPage(p: PageRequest): Promise<Page>,
    deletePage(p_id: string): Promise<boolean>

    // revisions
    getRecentPageRevisionById(p_id: string): Promise<Revision>,
    getAllPageRevisionsById(p_id: string): Promise<Revision[]>,
    getRevisionById(r_id: string): Promise<Revision>,
    getRecentPageRevisionByName(ref_page_name: string): Promise<Revision>,
    addRevision(r: RevisionRequest): Promise<Revision>,
    deleteRevision(r_id: string): Promise<boolean>,

    // categories
    getAllCategories(): Promise<Category[]>,
    getCategoryById(c_id: string): Promise<Category>,
    getCategoryByName(c_name: string): Promise<Category>,
    addNewCategory(c: CategoryRequest): Promise<Category>,
    deleteCategoryAndPages(c_id: string): Promise<boolean>,

    // only needed for the firebase auth flavor
    getUserByEmail(email: string): Promise<User>,
    addNewUser(u: User): Promise<User>,
    updateUser(u: User): Promise<string>,

    search(q: string): Promise<SearchResponse>,
}
