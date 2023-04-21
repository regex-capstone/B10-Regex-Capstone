import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { Category } from "../models";
import { ServerCategoryRequest } from "../models/Category";


export interface CategoryOptions extends BaseOptions {
    name?: string;
    slug?: string;
}

export interface CategorySortOptions {
    created_at?: number;
}

const database = MongooseDatabaseAPI;

export const CategoryAPI = {
    get: async (options: CategoryOptions, sort: CategorySortOptions) => {
        const query = cleanOptions(options);

        let response = (await database.Category.get(query, sort));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as Category[];

        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerCategoryRequest) => {
        const response = (await database.Category.add(serverRequest));

        if (isErrorResponse(response)) throw response.error;

        const resultCat = response.payload as Category;

        if (!resultCat) throw new Error('Error adding new category.');

        return resultCat;
    },

    delete: async (c_id: string) => {
        const response = (await database.Category.delete(c_id));

        if (isErrorResponse(response)) throw response.error;

        return response.success;
    }
}