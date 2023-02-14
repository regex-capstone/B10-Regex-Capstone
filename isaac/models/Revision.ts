export default interface Revision {
    content: string;
    created_at?: number;
    rev_page_id: string;
    // author: User; @TODO - handle user stuff
}