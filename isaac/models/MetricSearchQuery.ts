export default interface MetricSearchQuery {
    created_at: number;
    search_query: string;
}

export interface ClientMetricSearchQueryRequest {
    search_query: string;
}

export interface ServerMetricSearchQueryRequest extends ClientMetricSearchQueryRequest {
    created_at: number;
}
