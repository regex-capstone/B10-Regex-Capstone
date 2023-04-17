import type { Page, Revision, Category, User } from '../models/index';
import type API from "./APIInterface";
import IsaacAPI from "../ISAAC";
import { RevisionRequest } from '../models/Revision';
import { PageRequest } from '../models/Page';
import { marked } from 'marked';
import { AggregationTypes } from '../ISAACOptions';
import { GetCategoryOptions, GetCategoryTypes, GetPageOptions, GetPageTypes, GetRevisionOptions, GetRevisionTypes } from './APIInterface';

const ApiEndpoint: API = {
    // pages
    async getPages(get_type: GetPageTypes, get_options?: GetPageOptions) {
        switch (get_type) {
            case GetPageTypes.ALL_PAGES:
                return (await IsaacAPI.getPages({})) as Page[];

            case GetPageTypes.PAGES_BY_TITLE:
                if (!get_options?.p_title) throw new Error('No page title provided.');
                return (await IsaacAPI.getPages({ title: get_options?.p_title })) as Page[];

            case GetPageTypes.PAGES_BY_CATEGORY_ID:
                if (!get_options?.c_id) throw new Error('No category id provided.');
                return (await IsaacAPI.getPages({ page_category_id: get_options?.c_id })) as Page[];

            case GetPageTypes.PAGE_BY_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await IsaacAPI.getPages({ id: get_options?.p_id, single: true })) as Page;

            case GetPageTypes.PAGE_BY_SLUG:
                if (!get_options?.p_slug) throw new Error('No page slug provided.');
                return (await IsaacAPI.getPages({ slug: get_options?.p_slug, single: true })) as Page;

            case GetPageTypes.TRENDING_PAGES:
                return (await IsaacAPI.getPages({ aggregation_type: AggregationTypes.TRENDING_PAGES })) as Page[];
        }
    },
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

    async getPageBySlug(slug: string) {
        return (await IsaacAPI.getPages({ slug: slug, single: true })) as Page;
    },

    async getTrendingPages() {
        return (await IsaacAPI.getPages({ aggregation_type: AggregationTypes.TRENDING_PAGES })) as Page[];
    },

    async addNewPage(p: PageRequest) {
        const createdAt = Date.now();

        const page: Page = await IsaacAPI.addNewPage({
            title: p.title,
            page_category_id: p.page_category_id,
            description: '<add description here>',
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

    async deletePage(p_id: string) {
        return (await IsaacAPI.deletePage(p_id)) as boolean;
    },

    // revisions
    async getRevisions(get_type: GetRevisionTypes, get_options?: GetRevisionOptions) {
        switch (get_type) {
            case GetRevisionTypes.ALL_REVISIONS_OF_PAGE_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await IsaacAPI.getRevisions({ rev_page_id: get_options?.p_id })) as Revision | Revision[];

            case GetRevisionTypes.RECENT_REVISION_OF_PAGE_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await IsaacAPI.getRevisions({ rev_page_id: get_options?.p_id, single: true })) as Revision;

            case GetRevisionTypes.REVISION_BY_REVISION_ID:
                if (!get_options?.r_id) throw new Error('No revision id provided.');
                return (await IsaacAPI.getRevisions({ id: get_options?.r_id, single: true })) as Revision;
        }
    },

    async getRecentPageRevisionById(p_id: string) {
        return (await IsaacAPI.getRevisions({ rev_page_id: p_id, single: true })) as Revision;
    },

    async getAllPageRevisionsById(p_id: string) {
        return (await IsaacAPI.getRevisions({ rev_page_id: p_id })) as Revision[];
    },

    async getRevisionById(r_id: string) {
        return (await IsaacAPI.getRevisions({ id: r_id, single: true })) as Revision;
    },

    async getRecentPageRevisionByName(ref_page_name: string) {
        const page = (await this.getPageByTitle(ref_page_name)) as Page;
        return (await IsaacAPI.getRevisions({ rev_page_id: page.id, single: true })) as Revision;
    },

    async addRevision(r: RevisionRequest) {
        const rev = (await IsaacAPI.addNewRevision({
            content: r.content as string,
            rev_page_id: r.rev_page_id as string,
            created_at: Date.now() as number
        })) as Revision;

        if (!rev) throw new Error('Error adding new revision.');

        const tokens = marked.lexer(rev.content);
        const description = findParagraphs(tokens, 150);

        const page = (await IsaacAPI.updatePage(
            rev.rev_page_id.toString(),
            { description: description }
        ));

        return rev;
    },

    async deleteRevision(r_id: string) {
        return (await IsaacAPI.deleteRevision(r_id)) as boolean;
    },

    // categories
    async getCategories(get_type: GetCategoryTypes, get_options?: GetCategoryOptions) {
        switch (get_type) {
            case GetCategoryTypes.ALL_CATEGORIES:
                return (await IsaacAPI.getCategories({})) as Category[];

            case GetCategoryTypes.CATEGORY_BY_ID:
                if (!get_options?.c_id) throw new Error('No category id provided.');
                return (await IsaacAPI.getCategories({ id: get_options?.c_id, single: true })) as Category;

            case GetCategoryTypes.CATEGORY_BY_NAME:
                if (!get_options?.c_name) throw new Error('No category name provided.');
                return (await IsaacAPI.getCategories({ name: get_options?.c_name, single: true })) as Category;
        }
    },

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

    async deleteCategoryAndPages(c_id: string) {
        const pages = await this.getPagesByCategoryId(c_id);

        for (const page of pages) {
            await this.deletePage(page.id as string);
        }
        
        return (await IsaacAPI.deleteCategory(c_id)) as boolean;
    },

    async search(q: string) {
        const s = performance.now();
        const pages: Page[] = await IsaacAPI.getPages({}) as Page[];
        const searchPages = await IsaacAPI.search(q, pages);
        return {
            results: searchPages,
            time_elapsed: performance.now() - s
        };
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

function findParagraphs(token: any, return_length: number) {
    return findParagraphsHelper(token, 0, return_length);
}

function findParagraphsHelper(tokens: any, index: number, return_length: number): string {
    if (tokens.length <= index) return '';

    const token = tokens[index];

    if (token.type == 'paragraph') {
        let text: string = (token.text as string);
        
        return (text.length > return_length) 
            ? text.substring(0, return_length - 3) + '...'
            : text.substring(0, return_length);
    }

    return findParagraphsHelper(token.tokens, index + 1, return_length);
}

export default ApiEndpoint;