export default interface SearchSerial {
    id: string;
    page_ids: string[];
    tfidf_serial: string;
    created_at: number;
}

export interface ServerSearchSerialRequest {
    page_ids: string[];
    tfidf_serial: string;
    created_at: number;
}