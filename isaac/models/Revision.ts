export default interface Revision {
    id?: string;
    content: string;
    created_at: number;
    rev_page_id: string;
    // author: User; @TODO - handle user stuff
}

export interface RevisionRequest {
    content: string;
    rev_page_id: string;
}