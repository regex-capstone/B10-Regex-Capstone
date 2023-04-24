import Page from "./Page";

export default interface Revision {
    id?: string;
    content: string;
    created_at: number;
    page: string;
    //TODO: make author?
}

export interface ClientRevisionRequest {
    content: string;
    page: string;
}

export interface ServerRevisionRequest extends ClientRevisionRequest {
    created_at: number;
}