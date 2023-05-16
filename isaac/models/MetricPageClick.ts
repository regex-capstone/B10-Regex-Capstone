export default interface MetricPageClick {
    created_at: number;
    page: string;
}

export interface ClientMetricPageClickRequest {
    page: string;
}

export interface ServerMetricPageClickRequest extends ClientMetricPageClickRequest {
    created_at: number;
}
