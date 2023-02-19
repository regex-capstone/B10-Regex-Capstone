import type { Page, Revision, Category } from '@/isaac/models';
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

    // search(options: SearchOptions): Promise<Page[]>,
}
