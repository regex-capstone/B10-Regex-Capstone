import { Page } from "../models";
import Search from "../search/SearchInterface";
import { NaturalProvider } from "../search/natural/NaturalProvider";

const natural: Search = NaturalProvider;

export const SearchAPI = {
    search: async (q: string, pages: Page[]) => {
        if (natural.isCorpusOutdated()) {
            natural.updateCorpus(pages);
        }
        return natural.search(q, pages);
    },

    resetCorpus: () => {
        natural.setCorpusOutdated(true);
    }
}