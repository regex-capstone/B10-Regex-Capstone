import { SearchSerial } from "@/isaac/models";
import { TfIdf } from "natural";

export const NaturalProvider = {
    search: (q: string, searchSerial: SearchSerial) => {
        const corpus = new TfIdf(JSON.parse(searchSerial.tfidf_serial));
        let pageIdResults: any[] = [];
        corpus.tfidfs(q, (i, measure) => {
            if (measure > 0) {
                pageIdResults.push({
                    page_id: searchSerial.page_ids[i],
                    rating: measure
                });
            }
        });
        return pageIdResults.sort((a, b) => b.rating - a.rating)
    },
    addDocument: (searchSerial: SearchSerial, pageId: string, docContent: string) => {
        const rawCorpus = JSON.parse(searchSerial.tfidf_serial);
        const pageIds = searchSerial.page_ids;

        if (pageIds.includes(pageId)) { // page already exists in corpus
            deleteInCorpus(pageId, pageIds, rawCorpus);
        }

        const corpus = new TfIdf(rawCorpus);
        pageIds.push(pageId);
        corpus.addDocument(docContent);

        return {
            page_ids: pageIds,
            tfidf_serial: JSON.stringify(corpus),
        }
    },
    deleteDocument: (searchSerial: SearchSerial, pageId: string) => {
        const rawCorpus = JSON.parse(searchSerial.tfidf_serial);
        const pageIds = searchSerial.page_ids;

        if (pageIds.includes(pageId)) {
            deleteInCorpus(pageId, pageIds, rawCorpus);
        }

        return {
            page_ids: pageIds,
            tfidf_serial: JSON.stringify(rawCorpus),
        }
    },
    init: (pageIds: string[], docs: string[]) => {
        let corpus = new TfIdf();
        pageIds.forEach((pageId, i) => {
            corpus.addDocument(docs[i]);
        });

        return {
            page_ids: pageIds,
            tfidf_serial: JSON.stringify(corpus),
        }
    }
}

function deleteInCorpus(pageId: string, pageIds: string[], corpusObject: any) {
    const index = pageIds.indexOf(pageId);

    if (index > -1) {
        pageIds.splice(index, 1);
        const documents = corpusObject.documents;
        documents.splice(index, 1);
    }

    return {
        page_ids: pageIds,
        corpusObject: corpusObject
    }
}