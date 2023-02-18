export interface BaseOptions {
    id?: string
}

export interface PageOptions extends BaseOptions {
    title?: string,
    single?: boolean
}

export interface RevisionOptions extends BaseOptions {
    rev_page_id?: string,
    single?: boolean
}

export interface CategoryOptions extends BaseOptions {
    single?: string
}

export interface MetricsOptions extends BaseOptions {
    type?: string,
}