import { Page, SearchSerial } from "../models";
import { NaturalProvider } from "../services/search/natural/NaturalProvider";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { isErrorResponse } from "../database/DatabaseInterface";
import { ServerSearchSerialRequest } from "../models/SearchSerial";
import parse from "node-html-parser";

const natural = NaturalProvider;
const database = MongooseDatabaseAPI;

export const SearchAPI = {
    search: async (q: string) => {
        let searchSerial: SearchSerial = await getSearchSerial();
        if (!searchSerial) searchSerial = await init();
        
        const searchResponse = natural.search(q, searchSerial);

        const resultPageIds: string[] = searchResponse.map((result: any) => result.page_id);
        const response = await database.Page.get({ _id: { $in: resultPageIds } }, { created_at: -1 });
        if (isErrorResponse(response)) throw response.error;

        const results = resultPageIds.map((pageId: string) => {
            return (response.payload as Page[]).find((page: Page) => page.id === pageId)
        });

        return results;
    },
    addDocument: async (pageId: string, docContent: string) => {
        let searchSerial: SearchSerial = await getSearchSerial();
        if (!searchSerial) searchSerial = await init();
        const updated = natural.addDocument(searchSerial, pageId, docContent);
        const newSearchSerial: ServerSearchSerialRequest = {
            page_ids: updated.page_ids,
            tfidf_serial: updated.tfidf_serial,
            created_at: Date.now()
        }
        const deleted = await deleteSearchSerial(searchSerial.id);
        return await addSearchSerial(newSearchSerial);
    },
    removeDocument: async (pageId: string) => {
        let searchSerial: SearchSerial = await getSearchSerial();
        if (!searchSerial) searchSerial = await init();
        const updated = natural.deleteDocument(searchSerial, pageId);
        const newSearchSerial: ServerSearchSerialRequest = {
            page_ids: updated.page_ids,
            tfidf_serial: updated.tfidf_serial,
            created_at: Date.now()
        }
        const deleted = await deleteSearchSerial(searchSerial.id);
        return await addSearchSerial(newSearchSerial);
    }
}

async function getSearchSerial() {
    const response = await database.SearchSerial.get({}, { created_at: -1 });
    if (isErrorResponse(response)) throw response.error;
    return response.payload[0];
}

async function addSearchSerial(serverSearchSerialRequest: ServerSearchSerialRequest) {
    const response = await database.SearchSerial.add(serverSearchSerialRequest);
    if (isErrorResponse(response)) throw response.error;
    return response.payload;
}

async function deleteSearchSerial(id: string) {
    const response = await database.SearchSerial.delete({ _id: id });
    if (isErrorResponse(response)) throw response.error;
    return response.payload;
}

async function init() {
    const allPagesResponse = await database.Page.get({}, { created_at: -1 });
    if (isErrorResponse(allPagesResponse)) throw allPagesResponse.error;
    const allPages = allPagesResponse.payload;
    let pageIds: string[] = [];
    let docs: string[] = [];

    allPages.forEach((page: Page, i: number) => {
        pageIds[i] = page.id as string;
        docs[i] = page.title as string;
    });

    for (let i = 0; i < pageIds.length; i++) {
        const pageId = pageIds[i];
        const doc = docs[i];

        const recentRevResponse = await database.Revision.get({
            page: pageId
        }, { created_at: -1 });
        if (isErrorResponse(recentRevResponse)) throw recentRevResponse.error;
        const recentRev = recentRevResponse.payload[0];

        const text = parse(recentRev.content).text;

        for (let j = 0; j < 4; j++) {   // r/programminghorror
            docs[i] += ' ' + doc + ' ';
        }
        docs[i] += text;
    }

    const init = natural.init(pageIds, docs);
    
    return await addSearchSerial({
        page_ids: init.page_ids,
        tfidf_serial: init.tfidf_serial,
        created_at: Date.now()
    });
}