export interface BaseOptions {
    id?: string
}

export interface PageOptions extends BaseOptions {
    title?: string,
    page_category_id?: string,
    single?: boolean
}

export interface RevisionOptions extends BaseOptions {
    rev_page_id?: string,
    single?: boolean
}

export interface CategoryOptions extends BaseOptions {
    name?: string,
    single?: boolean
}

export interface MetricsOptions extends BaseOptions {
    single?: boolean
}