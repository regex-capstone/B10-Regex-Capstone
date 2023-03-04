import { Page } from "../models";
import natural from 'natural';

export async function search(q: string, pages: Page[]): Promise<Page[]> {
    let tfidf = new natural.TfIdf;  //init
    let sortedPageResults = [] as Page[];
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
    sortedPageResults = indexed.map(i => i.page);

    return sortedPageResults;
}