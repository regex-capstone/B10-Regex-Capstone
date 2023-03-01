import type { Page, Revision, Category, User } from '@/isaac/models';
import { PageOptions, RevisionOptions } from '../ISAACOptions';

export default interface API {
    // pages 
    getAllPages(): Promise<Page[]>,
    getPagesByCategoryId(c_id: string): Promise<Page[]>,
    getPageById(p_id: string): Promise<Page>,
    getPageByTitle(p_title: string): Promise<Page>,
    addNewPage(p: Page): Promise<string>,

    // revisions
    getRecentPageRevisionById(p_id: string): Promise<Revision>,
    getAllPageRevisionsById(p_id: string): Promise<Revision[]>,
    getRevisionById(r_id: string): Promise<Revision>,
    addRevision(r: Revision): Promise<string>,

    // categories
    getAllCategories(): Promise<Category[]>,
    getCategoryById(c_id: string): Promise<Category>,
    getCategoryByName(c_name: string): Promise<Category>,
    addNewCategory(c: Category): Promise<string>

    // only needed for the firebase auth flavor
    getUserByEmail(email: string): Promise<User>,
    addNewUser(u: User): Promise<User>,
    updateUser(u: User): Promise<string>,

    search(q: string): Promise<Page[]>,
}
