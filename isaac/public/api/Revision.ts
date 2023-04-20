import ISAACAPI from "@/isaac/ISAACAPI";
import { SortType } from "../PublicAPI";
import Revision, { RevisionRequest } from "@/isaac/models/Revision";

export default interface RevisionPublicAPIInterface {
    get(get_type: GetRevisionTypes, sort_type: SortType, get_options?: GetRevisionOptions): Promise<Revision | Revision[]>,
    add(r: RevisionRequest): Promise<Revision>,
    delete(p_id: string): Promise<boolean>
}

export enum GetRevisionTypes {
    ALL_REVISIONS_OF_PAGE_ID,
    RECENT_REVISION_OF_PAGE_ID,
    REVISION_BY_REVISION_ID
}

export interface GetRevisionOptions {
    p_id?: string;
    r_id?: string;
    ref_page_name?: string;
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
            default:
                throw new Error("Invalid get type.");
        }
    },

    add: async (r: RevisionRequest) => {
        const rev = (await isaac.Revision.add({
            content: r.content as string,
            rev_page_id: r.rev_page_id as string,
            created_at: Date.now() as number
        })) as Revision;

        if (!rev) throw new Error('Error adding new revision.');

        // TODO: handle page description update
        // const tokens = marked.lexer(rev.content);
        // const description = findParagraphs(tokens, 150);

        // const page = (await IsaacAPI.updatePage(
        //     rev.rev_page_id.toString(),
        //     { description: description }
        // ));

        // function findParagraphs(token: any, return_length: number) {
        //     return findParagraphsHelper(token, 0, return_length);
        // }
        
        // function findParagraphsHelper(tokens: any, index: number, return_length: number): string {
        //     if (tokens.length <= index) return '';
        
        //     const token = tokens[index];
        
        //     if (token.type == 'paragraph') {
        //         let text: string = (token.text as string);
                
        //         return (text.length > return_length) 
        //             ? text.substring(0, return_length - 3) + '...'
        //             : text.substring(0, return_length);
        //     }
        
        //     return findParagraphsHelper(token.tokens, index + 1, return_length);
        // }

        return rev;
    },

    delete: async (r_id: string) => {
        return (await isaac.Revision.delete(r_id)) as boolean;
    }
}
