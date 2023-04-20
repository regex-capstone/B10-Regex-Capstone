import ISAACAPI from "@/isaac/ISAACAPI";
import { Page } from "../../models";
import { ClientPageRequest, ServerPageRequest } from "../../models/Page";
import { SortType } from "../PublicAPI";

export default interface PagePublicAPIInterface {
    get(get_type: GetPageTypes, sort_type: SortType, get_options?: GetPageOptions): Promise<Page | Page[]>,
    add(p: ClientPageRequest): Promise<Page>,
    delete(p_id: string): Promise<boolean>
}

export enum GetPageTypes {
    PAGE_BY_ID,
    PAGES_BY_CATEGORY_ID,
    PAGES_BY_TITLE,
    PAGE_BY_SLUG,
    TRENDING_PAGES,
    ALL_PAGES
}

export interface GetPageOptions {
    c_id?: string;
    p_id?: string;
    p_title?: string;
    p_slug?: string;
}

const isaac = ISAACAPI;

export const PagePublicAPI: PagePublicAPIInterface = {
    get: async (get_type: GetPageTypes, sort_type: SortType, get_options?: GetPageOptions) => {
        let sort_options: any = {};

        switch (sort_type) {
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;
            case SortType.ALPHABETICAL:
                sort_options.title = 1;
                break;
            case SortType.NONE:
                break;
            default:
                throw new Error("Invalid sort type.");
        }

        switch (get_type) {
            case GetPageTypes.ALL_PAGES:
                return (await isaac.Page.get({}, sort_options)) as Page[];

            case GetPageTypes.PAGES_BY_TITLE:
                if (!get_options?.p_title) throw new Error('No page title provided.');
                return (await isaac.Page.get({ title: get_options?.p_title }, sort_options)) as Page[];

            case GetPageTypes.PAGES_BY_CATEGORY_ID:
                if (!get_options?.c_id) throw new Error('No category id provided.');
                return (await isaac.Page.get({ page_category_id: get_options?.c_id }, sort_options)) as Page[];

            case GetPageTypes.PAGE_BY_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.Page.get({ id: get_options?.p_id, single: true }, sort_options)) as Page;

            case GetPageTypes.PAGE_BY_SLUG:
                if (!get_options?.p_slug) throw new Error('No page slug provided.');
                return (await isaac.Page.get({ slug: get_options?.p_slug, single: true }, sort_options)) as Page;
            default:
                throw new Error('Invalid get type.');
            // case GetPageTypes.TRENDING_PAGES:
            //     return (await ISAACAPI.Page.get({ aggregation_type: AggregationTypes.TRENDING_PAGES }, sort_options)) as Page[];
        }
    },

    add: async (clientRequest: ClientPageRequest) => {
        const serverRequest: ServerPageRequest = {
            ...clientRequest,
            description: '<>',
            created_at: Date.now()
        }

        const page: Page = await isaac.Page.add(serverRequest);

        if (!page) throw new Error('Error adding new page.');

        return page;
    },

    delete: async (p_id: string) => {
        return (await isaac.Page.delete(p_id)) as boolean;
    }
}
