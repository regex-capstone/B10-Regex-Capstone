import type { Page, Revision, Category } from '../models/index';
import type API from "./APIInterface";
import IsaacAPI from "../ISAAC";

const ApiEndpoint: API = {
    // pages
    async getPages() {
        return (await IsaacAPI.getPages({})) as Page[];
    },

    async getPage(p_id: string) {
        const pages: Page[] = (await IsaacAPI.getPages({ id: p_id })) as Page[];
        return pages[0];
    },

    async addNewPage(p: Page) {
        const createdAt = Date.now();

        // add a new page
        const pageId: string = await IsaacAPI.addNewPage({
            ...p,
            created_at: createdAt
        }) as string;

        if (!pageId) throw new Error('Error adding new page.');

        // start the page's first revision
        const revId: string = await IsaacAPI.addNewRevision({
            created_at: createdAt,
            content: '<add content here>',
            rev_page_id: pageId
        }) as string;

        if (!revId) throw new Error('Error adding new revision.');

        return pageId;
    },

    // revisions
    async getRecentPageRevision(p_id: string) {
        return (await IsaacAPI.getRevisions({ rev_page_id: p_id, single: true })) as Revision;
    },

    async getAllPageRevisions(p_id: string) {
        return (await IsaacAPI.getRevisions({ rev_page_id: p_id })) as Revision[];
    },

    async getRevision(r_id: string) {
        return (await IsaacAPI.getRevisions({ id: r_id, single: true })) as Revision;
    },

    async addRevision(r: Revision) {
        return (await IsaacAPI.addNewRevision({
            ...r,
            created_at: Date.now()
        })) as string;
    },
    
    // categories
    async getAllCategories() {
        return (await IsaacAPI.getCategories({})) as Category[];
    },

    async getCategory(c_id: string) {
        return (await IsaacAPI.getCategories({ id: c_id })) as Category;
    },

    async addNewCategory(c: Category) {
        return (await IsaacAPI.addNewCategory({
            ...c,
            created_at: Date.now()
        })) as string;
    }
}

export default ApiEndpoint;