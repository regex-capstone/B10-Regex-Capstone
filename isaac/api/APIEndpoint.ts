import type { Page, Revision, Category } from '../models/index';
import type API from "./APIInterface";
import IsaacAPI from "../ISAAC";

const ApiEndpoint: API = {
    // pages
    async getAllPages() {
        return (await IsaacAPI.getPages({})) as Page[];
    },

    async getPagesByCategoryId(c_id: string) {
        return (await IsaacAPI.getPages({ page_category_id: c_id })) as Page[];
    },

    async getPageById(p_id: string) {
        return (await IsaacAPI.getPages({ id: p_id, single: true })) as Page;
    },

    async getPageByTitle(p_title: string) {
        return (await IsaacAPI.getPages({ title: p_title, single: true })) as Page;
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
    async getRecentPageRevisionById(p_id: string) {
        return (await IsaacAPI.getRevisions({ rev_page_id: p_id, single: true })) as Revision;
    },

    async getAllPageRevisionsById(p_id: string) {
        return (await IsaacAPI.getRevisions({ rev_page_id: p_id })) as Revision[];
    },

    async getRevisionById(r_id: string) {
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

    async getCategoryById(c_id: string) {
        return (await IsaacAPI.getCategories({ id: c_id, single: true })) as Category;
    },

    async getCategoryByName(c_name: string) {
        return (await IsaacAPI.getCategories({ name: c_name, single: true })) as Category;
    },

    async addNewCategory(c: Category) {
        return (await IsaacAPI.addNewCategory({
            ...c,
            created_at: Date.now()
        })) as string;
    }
}

export default ApiEndpoint;