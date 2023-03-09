import { Page } from "@/isaac/models";
import { TfIdf } from "natural";
import Search from "../SearchInterface";

export const NaturalProvider: Search = {
    search(q: string, pages: Page[]) {
        const tfidf = new TfIdf();
        let sortedPageResults = [] as Page[];
        let indexed = [] as Array<any>;
        let query = q;

        for(let i = 0; i < pages.length; i++) {
            tfidf.addDocument(pages[i].title);  //TODO: use more than the title?
        }

        tfidf.tfidfs(query, function(i, measure) {
            if(measure > 0) {     
                indexed.push({page: pages[i], rating: measure});
            }
        });

        indexed.sort((a, b) => b.rating - a.rating);
        sortedPageResults = indexed.map(i => i.page);

        return sortedPageResults;
    }
}