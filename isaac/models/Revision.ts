export default interface Revision {
    id?: string;
    content: string;
    created_at: number;
    rev_page_id: string;
    //TODO: make author?
}

export interface ClientRevisionRequest {
    content: string;
    rev_page_id: string;
}

export interface ServerRevisionRequest extends ClientRevisionRequest {
    created_at: number;
}