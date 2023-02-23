
export interface Metrics {
    id?: string;
    metrics: Metric;
}

export interface Metric {
    timestamp: number;
    major: string;
    standing: string;
}