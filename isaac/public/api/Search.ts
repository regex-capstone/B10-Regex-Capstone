import ISAACAPI from "@/isaac/ISAACAPI";
import { Page } from "@/isaac/models";
import { SearchResponse } from "@/isaac/services/search/SearchInterface";

export default interface SearchPublicAPIInterface {
    search(q: string): Promise<SearchResponse>,
    resetCorpus(): void
}

const isaac = ISAACAPI;

export const SearchPublicAPI: SearchPublicAPIInterface = {
    search: async (q: string) => {
        const s = performance.now();
        const results = await isaac.Search.search(
            q,
            (await isaac.Page.get({}, { created_at: -1 })) as Page[]
        );

        return {
            results: results,
            time_elapsed: performance.now() - s
        };
    },

    resetCorpus: () => {
        isaac.Search.resetCorpus();
    }
}
