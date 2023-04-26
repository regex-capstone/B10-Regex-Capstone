export default interface MetricPageFeedback {
    created_at: number;
    is_helpful: boolean;
    user_feedback: string;
    page_id: string;
}

export interface ClientMetricPageFeedbackRequest {
    is_helpful: boolean;
    user_feedback: string;
    page_id: string;
}

export interface ServerMetricPageFeedbackRequest extends ClientMetricPageFeedbackRequest {
    created_at: number;
}
