import type { Page, Revision, Category } from '../models/index';
import natural from "natural";
import type API from "./APIInterface";
import IsaacAPI from "../ISAAC";
import { RevisionRequest } from '../models/Revision';
import { PageRequest } from '../models/Page';

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

        // add a new page
        const pageId: string = await IsaacAPI.addNewPage({
            title: p.title,
            page_category_id: p.page_category_id,
            headings: [],
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

    async addRevision(r: RevisionRequest) {
        return (await IsaacAPI.addNewRevision({
            content: r.content as string,
            rev_page_id: r.rev_page_id as string,
            created_at: Date.now() as number
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
    },

    // search
    async search(q: string) {
        let pages = (await IsaacAPI.getPages({})) as Page[];    //TODO: more efficient IsaacAPI endpoint to not have to get all pages?

        let tfidf = new natural.TfIdf;  //init
        let sorted = [] as Page[];
        let indexed = [] as Array<any>;
        let query = q;

        for(let i = 0; i < pages.length; i++) {
            tfidf.addDocument(pages[i].title);  //TODO: more elegant way to tokenize doc and add to TF-IDF algo
        }

        // classify each document using given query
        tfidf.tfidfs(query, function(i, measure) {
            if(measure > 0) {     // if document has no matches, omit it from results
                indexed.push({page: pages[i], rating: measure});
            }
        });

        // sort objects by highest to lowest measure, then map to Page[]
        indexed.sort((a, b) => b.rating - a.rating);
        sorted = indexed.map(i => i.page);

        return sorted;
    }
}

export default ApiEndpoint;