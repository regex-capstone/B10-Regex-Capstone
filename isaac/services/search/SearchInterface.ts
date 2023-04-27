import { Page } from "../../models";

export default interface Search {
    search(query: string, pages: Page[]): Page[],
    updateCorpus(pages: Page[]): void,
    setCorpusOutdated(shouldUpdate: boolean): void,
    isCorpusOutdated(): boolean
}

export interface SearchResponse {
    results: Page[],
    time_elapsed: number
}