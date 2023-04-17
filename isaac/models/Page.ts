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

interface Heading {
    text: string;
    level: number;
    slug: string;   // 150 characters max for slug
}




