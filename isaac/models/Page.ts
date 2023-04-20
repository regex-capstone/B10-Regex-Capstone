export default interface Page {
    id?: string;
    title: string;
    page_category_id: string;
    created_at: number;
    description: string;
    slug?: string;
}

export interface PageRequest {
    title: string;
    page_category_id: string;
}
