import mongoose from "mongoose";

export default interface Page {
    id?: string;
    title: string;
    page_category_id: string;
    created_at: number;
    description: string;
    slug: string;
}

export interface ClientPageRequest {
    title: string;
    page_category_id: string;
}

export interface ServerPageRequest extends ClientPageRequest{
    description: string;
    created_at: number;
}
