export interface Metric {
    created_at?: number;
    major: string;
    standing: string;
    met_page_id?: string;
}

export interface SearchMetric {
    created_at?: number;
    query: string;
}