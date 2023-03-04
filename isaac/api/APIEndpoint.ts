import type { Page, Revision, Category, User } from '../models/index';
import natural from "natural";
import type API from "./APIInterface";
import IsaacAPI from "../ISAAC";
import { RevisionRequest } from '../models/Revision';
import { PageRequest } from '../models/Page';
import { search } from '../search/NaturalProvider';

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

    async addNewPage(p: PageRequest) {
        const createdAt = Date.now();

        const page: Page = await IsaacAPI.addNewPage({
            title: p.title,
            page_category_id: p.page_category_id,
            description: '<add description here>',
            headings: [],
            created_at: createdAt
        });

        if (!page) throw new Error('Error adding new page.');

        const rev: Revision = await IsaacAPI.addNewRevision({
            created_at: createdAt,
            content: '<add content here>',
            rev_page_id: page.id as string
        });

        if (!rev) throw new Error('Error adding new revision.');

        return page;
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

    async addRevision(r: RevisionRequest) {
        const rev = (await IsaacAPI.addNewRevision({
            content: r.content as string,
            rev_page_id: r.rev_page_id as string,
            created_at: Date.now() as number
        })) as Revision;

        if (!rev) throw new Error('Error adding new revision.');

        // parse for page description
        // @TODO: make this better

        const page = (await IsaacAPI.updatePage(
            rev.rev_page_id,
            { description: rev.content.substring(0, 150) }
        ));

        return rev;
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
        })) as Category;
    },

    // search
    async search(q: string) {
        //TODO: more efficient IsaacAPI endpoint to not have to get all pages?
        return search(q, (await IsaacAPI.getPages({})) as Page[]);
    },

    async getUserByEmail(email: string) {
        return (await IsaacAPI.getUsers({ email: email, single: true })) as User;
    },

    async addNewUser(u: User) {
        return (await IsaacAPI.addNewUser({
            ...u,
            created_at: Date.now()
        })) as User;
    },

    async updateUser(u: User) {
        return (await IsaacAPI.updateUser({
            ...u
        })) as string;
    }
}

export default ApiEndpoint;