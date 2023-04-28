import ISAACAPI from "@/isaac/ISAACAPI";
import { SortType } from '@/isaac/public/SortType';
import Revision, { ClientRevisionRequest, ServerRevisionRequest } from "@/isaac/models/Revision";
import { Page } from "@/isaac/models";
import parse from "node-html-parser";

export default interface RevisionPublicAPIInterface {
    get(get_type: GetRevisionTypes, sort_type: SortType, get_options?: GetRevisionOptions): Promise<Revision | Revision[]>,
    add(r: ClientRevisionRequest): Promise<Revision>,
    delete(p_id: string): Promise<boolean>
}

export enum GetRevisionTypes {
    ALL_REVISIONS_OF_PAGE_ID,
    RECENT_REVISION_OF_PAGE_ID, // TODO deprecate?
    REVISION_BY_REVISION_ID,
    REVISIONS_BY_PAGE_SLUG
}

export interface GetRevisionOptions {
    p_id?: string;
    r_id?: string;
    ref_page_name?: string;
    p_slug?: string;
    populate?: boolean; // appending page data to revision data
}

const isaac = ISAACAPI;

export const RevisionPublicAPI: RevisionPublicAPIInterface = {
    get: async (get_type: GetRevisionTypes, sort_type: SortType, get_options?: GetRevisionOptions) => {
        let options: any = {
            populate: get_options?.populate ?? false
        };
        let sort_options: any = {};

        switch (sort_type) {
            case SortType.RECENTLY_CREATED:
                sort_options.created_at = -1;
                break;
            case SortType.NONE:
                break;
            default:
                throw new Error("Invalid sort type.");
        }

        switch (get_type) {
            case GetRevisionTypes.ALL_REVISIONS_OF_PAGE_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.Revision.get({ ...options, page: get_options?.p_id }, sort_options)) as Revision | Revision[];

            case GetRevisionTypes.RECENT_REVISION_OF_PAGE_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.Revision.get({ ...options, page: get_options?.p_id, single: true }, sort_options)) as Revision;

            case GetRevisionTypes.REVISION_BY_REVISION_ID:
                if (!get_options?.r_id) throw new Error('No revision id provided.');
                return (await isaac.Revision.get({ ...options, id: get_options?.r_id, single: true }, sort_options)) as Revision;

            case GetRevisionTypes.REVISIONS_BY_PAGE_SLUG:
                if (!get_options?.p_slug) throw new Error('No page slug provided.');
                const page = (await isaac.Page.get({ slug: get_options?.p_slug, single: true }, sort_options)) as Page;
                if (!page) throw new Error('No page found.');
                return (await isaac.Revision.get({ ...options, page: page.id }, sort_options)) as Revision[];

            default:
                throw new Error("Invalid get type.");
        }
    },

    add: async (clientRequest: ClientRevisionRequest) => {
        const serverRequest: ServerRevisionRequest = {
            ...clientRequest,
            created_at: Date.now()
        };

        const rev = (await isaac.Revision.add(serverRequest)) as Revision;

        if (!rev) throw new Error('Error adding new revision.');

        const html = parse(rev.content);
        const paragraphs = html.getElementsByTagName('p');
        const characterCount = 148;
        let description = "";

        if (paragraphs.length === 0) {
            description = html.textContent.substring(0, characterCount);
            if (description.length === characterCount) description += '...';
        } else {
            description = paragraphs[0].textContent.substring(0, characterCount);
            if (description.length === characterCount) description += '...';
        }

        const page = (await isaac.Page.update(
            `id ${rev.page}`,
            { description: description }
        ));

        if (!page) throw new Error('Error updating page description.');

        return rev;
    },

    delete: async (r_id: string) => {
        return (await isaac.Revision.delete(r_id)) as boolean;
    }
}
