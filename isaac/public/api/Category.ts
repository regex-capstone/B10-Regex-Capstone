import ISAACAPI from "@/isaac/ISAACAPI";
import { Category } from "../../models";
import { ClientCategoryRequest, ServerCategoryRequest } from "../../models/Category";
import { SortType } from "../PublicAPI";

export default interface CategoryPublicAPIInterface {
    get(get_type: GetCategoryTypes, sort_type: SortType, get_options?: GetCategoryOptions): Promise<Category | Category[]>,
    add(c: ClientCategoryRequest): Promise<Category>,
    delete(c_id: string): Promise<boolean>,
}

export enum GetCategoryTypes {
    ALL_CATEGORIES,
    CATEGORY_BY_ID,
    CATEGORY_BY_NAME,
    CATEGORY_BY_SLUG
}

export interface GetCategoryOptions {
    c_id?: string;
    c_name?: string;
    c_slug?: string;
}

const isaac = ISAACAPI;

export const CategoryPublicAPI: CategoryPublicAPIInterface = {
    get: async (get_type: GetCategoryTypes, sort_type: SortType, get_options?: GetCategoryOptions) => {
        let sort_options: any = {};

        switch (sort_type) {
            case SortType.ALPHABETICAL:
                sort_options.name = 1;
                break;
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;
            case SortType.NONE:
                break;
            default:
                throw new Error("Invalid sort type.");
        }
        
        switch (get_type) {
            case GetCategoryTypes.ALL_CATEGORIES:
                return (await isaac.Category.get({}, sort_options)) as Category[];

            case GetCategoryTypes.CATEGORY_BY_ID:
                if (!get_options?.c_id) throw new Error('No category id provided.');
                return (await isaac.Category.get({ id: get_options?.c_id, single: true }, sort_options)) as Category;

            case GetCategoryTypes.CATEGORY_BY_NAME:
                if (!get_options?.c_name) throw new Error('No category name provided.');
                return (await isaac.Category.get({ name: get_options?.c_name, single: true }, sort_options)) as Category;

            case GetCategoryTypes.CATEGORY_BY_SLUG:
                if (!get_options?.c_slug) throw new Error('No category slug provided.');
                return (await isaac.Category.get({ slug: get_options?.c_slug, single: true }, sort_options)) as Category;
        }

        return [];
    },

    add: async (clientRequest: ClientCategoryRequest): Promise<Category> => {
        const serverRequest: ServerCategoryRequest = {
            ...clientRequest,
            created_at: Date.now()
        }

        return (await isaac.Category.add(serverRequest)) as Category;
    },

    delete: async (c_id: string): Promise<boolean> => {
        return (await isaac.Category.delete(c_id)) as boolean;
    }
} 
