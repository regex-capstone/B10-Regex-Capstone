import { BaseOptions, cleanOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { Category } from "../models";
import { ServerCategoryRequest } from "../models/Category";


export interface CategoryOptions extends BaseOptions {
    name?: string;
}

export interface CategorySortOptions {
    created_at?: number;
}

export const CategoryAPI = {
    get: async (options: CategoryOptions, sort: CategorySortOptions) => {
        const query = cleanOptions(options);

        let response = (await MongooseDatabaseAPI.Category.get(query, sort));

        if (isErrorResponse(response)) throw response.error;

        const payload = response.payload as Category[];

        return options.single ? payload[0] : payload;
    },

    add: async (request: ServerCategoryRequest) => {
        const response = (await MongooseDatabaseAPI.Category.add(request));

        if (isErrorResponse(response)) throw response.error;

        const resultCat = response.payload as Category;

        if (!resultCat) throw new Error('Error adding new category.');

        return resultCat;
    },

    delete: async (c_id: string) => {
        const response = (await MongooseDatabaseAPI.Category.delete(c_id));

        if (isErrorResponse(response)) throw response.error;

        return response.success;
    }
}