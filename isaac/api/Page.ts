import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { Page } from "../models";
import { ServerPageRequest } from "../models/Page";

export interface PageOptions extends BaseOptions {
    title?: string;
    page_category_id?: string;
    slug?: string;
}

export interface PageSortOptions {
    created_at?: number;
}

export const PageAPI = {
    get: async (options: PageOptions, sort: PageSortOptions) => {
        const query = cleanOptions(options);

        const response = (await MongooseDatabaseAPI.Page.get(query, sort));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as Page[];

        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerPageRequest) => {
        const response = (await MongooseDatabaseAPI.Page.add(serverRequest));

        if (isErrorResponse(response)) throw response.error;

        const resultPage = response.payload as Page;

        if (!resultPage) throw new Error('Error adding new page.');

        // TODO: Update the natural language corpus
        // natural.setCorpusOutdated(true);

        return resultPage;
    },

    update: async (p_id: string, attributes: Partial<Page>) => {
        const response = (await MongooseDatabaseAPI.Page.update(p_id, attributes));

        if (isErrorResponse(response)) throw response.error;

        const resultPage = response.payload as Page;

        if (!resultPage) throw new Error('Error updating page.');

        return resultPage;
    },

    delete: async (p_id: string) => {
        const response = (await MongooseDatabaseAPI.Page.delete(p_id));

        if (isErrorResponse(response)) throw response.error;

        // TODO: Update the natural language corpus
        // natural.setCorpusOutdated(true);

        return response.success;
    }
}