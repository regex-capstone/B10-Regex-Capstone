export default interface MetricPageClick {
    created_at: number;
    page_id: string;
}

export interface ClientMetricPageClickRequest {
    page_id: string;
}

export interface ServerMetricPageClickRequest extends ClientMetricPageClickRequest {
    created_at: number;
}
