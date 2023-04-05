export interface BaseOptions {
    id?: string,
    single?: boolean
}

export interface PageOptions extends BaseOptions {
    title?: string,
    page_category_id?: string
}

export interface UpdatePageOptions extends BaseOptions {
    description?: string;
}

export interface RevisionOptions extends BaseOptions {
    rev_page_id?: string
}

export interface CategoryOptions extends BaseOptions {
    name?: string
}

export interface MetricsOptions extends BaseOptions {
    met_page_id?: string,
    major?: string,
    standing?: string,
    single?: boolean
}

export interface SearchOptions extends BaseOptions {
    query?: string
}

// only needed for the firebase auth flavor
export interface UserOptions extends BaseOptions {
    email?: string
}
