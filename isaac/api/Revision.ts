import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { Revision } from "../models";
import { ServerRevisionRequest } from "../models/Revision";

export interface RevisionOptions extends BaseOptions {
    rev_page_id?: string;
}

export interface RevisionSortOptions {
    created_at?: number;
}

const database = MongooseDatabaseAPI;

export const RevisionAPI = {
    get: async (options: RevisionOptions, sort: RevisionSortOptions) => {
        const query = cleanOptions(options);

        let response = (await database.Revision.get(query, sort));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as Revision[];

        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerRevisionRequest) => {
        const response = (await database.Revision.add(serverRequest));

        if (isErrorResponse(response)) throw response.error;

        const resultRev = response.payload as Revision;

        if (!resultRev) throw new Error('Error adding new revision.');

        return resultRev;
    },

    delete: async (r_id: string) => {
        const response = (await database.Revision.delete(r_id));

        if (isErrorResponse(response)) throw response.error;

        return response.success;
    }
}