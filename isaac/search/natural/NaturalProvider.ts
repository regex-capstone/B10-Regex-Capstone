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
    },

    // used in v2.0
    // search2_0: (
    //     query: string, 
    //     pages: Page[],
    //     serialized: string
    // )=> {
    //     const instance = new TfIdf(JSON.parse(serialized));
    //     const index: any[] = [];

    //     instance.tfidfs(query, function(i, measure) {
    //         if(measure > 0) {     
    //             index.push({page: pages[i], rating: measure});
    //         }
    //     });

    //     return index
    //         .sort((a, b) => b.rating - a.rating)
    //         .map(i => i.page);
    // },

    // addDocument: (old_serial: string, doc: string) => {
    //     const instance = new TfIdf(JSON.parse(old_serial));
    //     instance.addDocument(doc);
    //     return JSON.stringify(instance);
    // },

    // refresh: (pages: Page[]) => {
    //     const instance = new TfIdf();
        
    //     for (let i = 0; i < pages.length; i++) {
    //         instance.addDocument(pages[i].title);
    //     }

    //     return JSON.stringify(instance);
    // }
}