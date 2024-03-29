import ISAACAPI from "@/isaac/ISAACAPI";
import { Page } from "@/isaac/models";
import { SearchResponse } from "@/isaac/services/search/SearchInterface";

export default interface SearchPublicAPIInterface {
    search(q: string): Promise<SearchResponse>,
    add(pageId: string, docContent: string): Promise<any>,
    delete(pageId: string): Promise<any>,
}

const isaac = ISAACAPI;

export const SearchPublicAPI = {
    search: async (q: string) => {
        let results = [];
        const s = performance.now();
        
        results = (q === '') 
            ? await isaac.Page.get({}, { created_at: -1 }) as Page[]
            : await isaac.Search.search(q) as Page[];

        return {
            results: results,
            time_elapsed: performance.now() - s
        };
    },
    add: async (pageId: string, docContent: string) => {
        return await isaac.Search.addDocument(pageId, docContent);
    },

    delete: async (pageId: string) => {
        return await isaac.Search.removeDocument(pageId);
    }
}
