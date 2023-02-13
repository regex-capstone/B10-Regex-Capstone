export interface PageOptions {
    id?: string
    single?: boolean
}

export interface RevisionOptions {
    parent_id?: string,
    id?: string,
    single?: boolean
}

export interface CategoryOptions {
    id?: string,
    single?: string
}

export interface SearchOptions {
    query?: string,
    categories?: string[],
}

export interface MetricsOptions {
    id: string,
    type: string,
}