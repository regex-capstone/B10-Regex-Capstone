import { Page } from "@/isaac/models";
import { TfIdf } from "natural";
import Search from "../SearchInterface";

let corpus: TfIdf = new TfIdf();
let isCorpusOutdated = true;

export const NaturalProvider: Search = {
    search(q: string, pages: Page[]) {
        const query = q.toLowerCase();
        let index = [] as Array<any>;

        corpus.tfidfs(query, (i, measure) => {
            if (measure > 0) {
                index.push({ page: pages[i], rating: measure });
            }
        });

        return index
            .sort((a, b) => b.rating - a.rating)
            .map(i => i.page);
    },

    updateCorpus(pages: Page[]) {
        const newCorpus = new TfIdf();

        for (let i = 0; i < pages.length; i++) {
            const document = pages[i].title.toLowerCase();
            newCorpus.addDocument(document);
        }

        corpus = newCorpus;

        isCorpusOutdated = false;
    },

    setCorpusOutdated(isOutdated: boolean) {
        isCorpusOutdated = isOutdated;
    },

    isCorpusOutdated() {
        return isCorpusOutdated;
    }
}