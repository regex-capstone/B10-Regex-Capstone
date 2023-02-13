import type { Page, Revision, Category } from '@/isaac/models';
import { PageOptions, RevisionOptions } from '../ISAACOptions';

export default interface API {
    // pages 
    getPages(): Promise<Page[]>,
    getPage(p_id: string): Promise<Page>,
    addNewPage(p: Page): Promise<string>,

    // revisions
    getRecentPageRevision(p_id: string): Promise<Revision>,
    getAllPageRevisions(p_id: string): Promise<Revision[]>,
    getRevision(r_id: string): Promise<Revision>,
    updateLatestPageRevision(p_id: string, content: string): Promise<string>,

    // categories
    getAllCategories(): Promise<Category[]>,
    getCategory(c_id: string): Promise<Category>,
    addNewCategory(c: Category): Promise<string>

    // search(options: SearchOptions): Promise<Page[]>,
}
