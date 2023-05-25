import Category from "./Category";

export default interface Page {
    id?: string;
    title: string;
    category?: string | Category | null;
    created_at: number;
    description: string;
    slug?: string;
}

export interface ClientPageRequest {
    title: string;
    category?: string;
}

export interface ServerPageRequest extends ClientPageRequest {
    created_at: number;
    description: string;
}

export interface ClientPageUpdateRequest extends Partial<Page> {
    title?: string;
    category?: string | null;
    description?: string;
}
