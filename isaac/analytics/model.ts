
export interface Metrics {
    id?: string;
    entries: Metric;
}

export interface Metric {
    timestamp: Date;
    major: string;
    standing: string;
}