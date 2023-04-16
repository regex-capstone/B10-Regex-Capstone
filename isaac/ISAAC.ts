import type { Page, Revision, Category, User } from './models/index';
import type Metric from './analytics/model'
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/mongoose/MongooseDatabase';
import { CategoryOptions, PageOptions, RevisionOptions, MetricsOptions, BaseOptions, UpdatePageOptions, UserOptions, AggregationTypes } from './ISAACOptions';
import { isErrorResponse } from './database/DatabaseInterface';
import { NaturalProvider } from './search/natural/NaturalProvider';
import Search from './search/SearchInterface';

const database: Database = MongooseDatabase;
const natural: Search = NaturalProvider;

async function getPages(options: PageOptions): Promise<Page | Page[]> {
    let query = cleanQuery(options);
    let sort = { created_at: -1 };

    let response;
    let payload: Page[] = [];

    switch (options.aggregation_type) {
        case AggregationTypes.TRENDING_PAGES:
            response = (await database.aggregate(AggregationTypes.TRENDING_PAGES));
            break;
        default:
            response = (await database.getPages(query, sort));
            break;
    }

    if (isErrorResponse(response)) throw response.error;

    switch (options.aggregation_type) {
        case AggregationTypes.TRENDING_PAGES:
            for (const data of response.payload) {
                const page = data.page[0];
                payload.push(page);
            }
            break;
        default:
            payload = response.payload;
            break;
    }

    return options.single ? payload[0] : payload;
}

async function getRevisions(options: RevisionOptions): Promise<Revision | Revision[]> {
    let query = cleanQuery(options);
    let sort = { created_at: -1 };

    let response;

    response = (await database.getRevisions(query, sort));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Revision[];

    return options.single ? payload[0] : payload;
}

async function getCategories(options: CategoryOptions): Promise<Category | Category[]> {
    let query = cleanQuery(options);
    let sort = { created_at: -1 };

    let response;

    response = (await database.getCategories(query, sort));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Category[];

    return options.single ? payload[0] : payload;
}

async function addNewPage(p: Page): Promise<Page> {
    const doesPageExists = (await getPages({ title: p.title })) as Page[];

    if (doesPageExists.length > 0) throw new Error('Page with same title already exists.');

    const response = (await database.addPage(p));

    if (isErrorResponse(response)) throw response.error;

    const resultPage = response.payload as Page;

    if (!resultPage) throw new Error('Error adding new page.');

    natural.setCorpusOutdated(true);

    return resultPage;
}

async function addNewRevision(r: Revision): Promise<Revision> {
    const response = (await database.addRevision(r));

    if (isErrorResponse(response)) throw response.error;

    const resultRev = response.payload as Revision;

    if (!resultRev) throw new Error('Error adding new revision.');

    return resultRev;
}

async function addNewCategory(c: Category): Promise<Category> {
    const response = (await database.addCategory(c));

    if (isErrorResponse(response)) throw response.error;

    const resultCat = response.payload as Category;

    if (!resultCat) throw new Error('Error adding new category.');

    return resultCat;
}

async function updatePage(id: string, options: UpdatePageOptions): Promise<Page> {
    const response = (await database.updatePage(id, options));

    if (isErrorResponse(response)) throw response.error;

    const resultPage = response.payload as Page;

    if (!resultPage) throw new Error('Error updating page.');

    return resultPage;
}

async function addAnalytic(m: Metric) {
    const response = (await database.addAnalytic(m));

    if (isErrorResponse(response)) throw response.error;

    const resultMetricId = response.payload;

    if (!resultMetricId) throw new Error('Error adding new analytic.');

    return resultMetricId;
}

async function getAnalytics(options: MetricsOptions) {
    let query = cleanQuery(options);

    const response = (await database.getAnalytics(query));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Metric[];

    return options.single ? payload[0] : payload;
}

async function getAllAnalytics() {
    const response = (await database.getAnalytics({ }));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Metric[];

    return payload;
}

// only needed for the firebase auth flavor
async function getUsers(options: UserOptions) {
    let response;

    response = (await database.getLatestUsers(options));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as User[];

    return options.single ? payload[0] : payload;
}

async function addNewUser(u: User) {
    const response = (await database.addNewUser(u));

    if (isErrorResponse(response)) throw response.error;

    const resultUser = response.payload;

    if (!resultUser) throw new Error('Error adding new user.');

    return resultUser;
}

async function updateUser(u: User) {
    const response = (await database.updateUser(u));

    if (isErrorResponse(response)) throw response.error;

    const resultUserId = response.payload;

    // @TODO more robust error handling
    if (!resultUserId) throw new Error('Error updating user.');

    return resultUserId;
}

async function deletePage(p_id: string) {
    const response = await database.deletePage(p_id)

    if (isErrorResponse(response)) throw response.error;

    natural.setCorpusOutdated(true);

    return response.success;
}

async function deleteRevision(r_id: string) {
    const response = await database.deleteRevision(r_id);

    if (isErrorResponse(response)) throw response.error;

    return response.success;
}

async function deleteCategory(c_id: string) {
    const response = await database.deleteCategory(c_id);

    if (isErrorResponse(response)) throw response.error;

    return response.success;
}

async function search(q: string, pages: Page[]) {
    if (natural.isCorpusOutdated()) {
        natural.updateCorpus(pages);
    }
    return natural.search(q, pages);
}

export default {
    getPages: getPages,
    getRevisions: getRevisions,
    getUsers: getUsers,
    getAnalytics: getAnalytics,
    getAllAnalytics: getAllAnalytics,
    getCategories: getCategories,
    addNewPage: addNewPage,
    addNewRevision: addNewRevision,
    addNewCategory: addNewCategory,
    addAnalytic: addAnalytic,
    addNewUser: addNewUser,
    updatePage: updatePage,
    updateUser: updateUser,
    deletePage: deletePage,
    deleteRevision: deleteRevision,
    deleteCategory: deleteCategory,
    search: search
};

function cleanQuery(options: BaseOptions) {
    const id = options.id;

    let query = {}

    // Because MongoDB uses '_id' instead of just 'id', we need to do change
    // the property here.
    if (id) {
        delete options.id;

        query = {
            _id: id
        }
    }

    return {
        ...query,
        ...options
    }
}

