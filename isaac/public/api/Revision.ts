import ISAACAPI from "@/isaac/ISAACAPI";
import { SortType } from '@/isaac/public/SortType';
import Revision, { ClientRevisionRequest, ServerRevisionRequest } from "@/isaac/models/Revision";
import { Page } from "@/isaac/models";

export default interface RevisionPublicAPIInterface {
    get(get_type: GetRevisionTypes, sort_type: SortType, get_options?: GetRevisionOptions): Promise<Revision | Revision[]>,
    add(r: ClientRevisionRequest): Promise<Revision>,
    delete(p_id: string): Promise<boolean>
}

export enum GetRevisionTypes {
    ALL_REVISIONS_OF_PAGE_ID,
    RECENT_REVISION_OF_PAGE_ID,
    REVISION_BY_REVISION_ID,
    REVISIONS_BY_PAGE_SLUG
}

export interface GetRevisionOptions {
    p_id?: string;
    r_id?: string;
    ref_page_name?: string;
    p_slug?: string;
}

const isaac = ISAACAPI;

export const RevisionPublicAPI: RevisionPublicAPIInterface = {
    get: async (get_type: GetRevisionTypes, sort_type: SortType, get_options?: GetRevisionOptions) => {
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
                return (await isaac.Revision.get({ rev_page_id: get_options?.p_id }, sort_options)) as Revision | Revision[];

            case GetRevisionTypes.RECENT_REVISION_OF_PAGE_ID:
                if (!get_options?.p_id) throw new Error('No page id provided.');
                return (await isaac.Revision.get({ rev_page_id: get_options?.p_id, single: true }, sort_options)) as Revision;

            case GetRevisionTypes.REVISION_BY_REVISION_ID:
                if (!get_options?.r_id) throw new Error('No revision id provided.');
                return (await isaac.Revision.get({ id: get_options?.r_id, single: true }, sort_options)) as Revision;

            case GetRevisionTypes.REVISIONS_BY_PAGE_SLUG:
                if (!get_options?.p_slug) throw new Error('No page slug provided.');
                
                const page = (await isaac.Page.get({ slug: get_options?.p_slug, single: true }, sort_options)) as Page;

                if (!page) throw new Error('No page found.');

                return (await isaac.Revision.get({ rev_page_id: page.id }, sort_options)) as Revision[];

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

        // TODO: handle page description update using HTML parser
        const page = (await isaac.Page.update(
            rev.rev_page_id.toString(),
            { description: '<>' }
        ));

        if (!page) throw new Error('Error updating page description.');

        return rev;
    },

    delete: async (r_id: string) => {
        return (await isaac.Revision.delete(r_id)) as boolean;
    }
}
