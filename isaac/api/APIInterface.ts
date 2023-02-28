import type { Page, Revision, Category } from '@/isaac/models';
import { PageRequest } from '../models/Page';
import { RevisionRequest } from '../models/Revision';

export default interface API {
    // pages 
    getAllPages(): Promise<Page[]>,
    getPagesByCategoryId(c_id: string): Promise<Page[]>,
    getPageById(p_id: string): Promise<Page>,
    getPageByTitle(p_title: string): Promise<Page>,
    addNewPage(p: PageRequest): Promise<string>,

    // revisions
    getRecentPageRevisionById(p_id: string): Promise<Revision>,
    getAllPageRevisionsById(p_id: string): Promise<Revision[]>,
    getRevisionById(r_id: string): Promise<Revision>,
    addRevision(r: RevisionRequest): Promise<string>,

    // categories
    getAllCategories(): Promise<Category[]>,
    getCategoryById(c_id: string): Promise<Category>,
    getCategoryByName(c_name: string): Promise<Category>,
    addNewCategory(c: Category): Promise<string>

    search(q: string): Promise<Page[]>,
}
