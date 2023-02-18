import type { Page, Revision, Category } from './models/index';
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/mongoose/MongooseDatabase';
import { CategoryOptions, PageOptions, RevisionOptions, BaseOptions } from './ISAACOptions';
import { isErrorResponse } from './database/DatabaseInterface';

const database: Database = MongooseDatabase;

async function getPages(options: PageOptions) {
    let query = cleanQuery(options);

    let response;

    response = (await database.getLatestPages(query));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Page[];

    return options.single ? payload[0] : payload;
}

async function getRevisions(options: RevisionOptions) {
    let query = cleanQuery(options);

    let response;

    response = (await database.getLatestRevisions(query));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Revision[];

    return options.single ? payload[0] : payload;
}

async function getCategories(options: CategoryOptions) {
    let query = cleanQuery(options);

    let response;

    response = (await database.getLatestCategories(query));

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Category[];

    return options.single ? payload[0] : payload;
}

async function addNewPage(p: Page) {
    const doesPageExists = (await getPages({ title: p.title })) as Page[];

    if (doesPageExists.length > 0) throw new Error('Page with same title already exists.');

    const response = (await database.addPage(p));

    if (isErrorResponse(response)) throw response.error;

    const resultPageId = response.payload;

    if (!resultPageId) throw new Error('Error adding new page.');

    return resultPageId;
}

async function addNewRevision(r: Revision) {
    const response = (await database.addRevision(r));

    if (isErrorResponse(response)) throw response.error;

    const resultRevId = response.payload;

    if (!resultRevId) throw new Error('Error adding new revision.');

    return resultRevId;
}

async function addNewCategory(c: Category) {
    const response = (await database.addCategory(c));

    if (isErrorResponse(response)) throw response.error;

    const resultCatId = response.payload;

    if (!resultCatId) throw new Error('Error adding new category.');

    return resultCatId;
}

export default {
    getPages: getPages,
    getRevisions: getRevisions,
    getCategories: getCategories,
    addNewPage: addNewPage,
    addNewRevision: addNewRevision,
    addNewCategory: addNewCategory
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

