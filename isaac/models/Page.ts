export default interface Page {
    id: string;
    title: string;
    page_category_id: string;
    created_at: number;
    headings: Heading[];
}

interface Heading {
    text: string;
    level: number;
    slug: string;   // 150 characters max for slug
}




