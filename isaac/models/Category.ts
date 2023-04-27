export default interface Category {
    id?: string;
    name: string;
    created_at: number;
    slug: string;
}

export interface ClientCategoryRequest {
    name: string;
}

export interface ServerCategoryRequest extends ClientCategoryRequest {
    created_at: number;
}