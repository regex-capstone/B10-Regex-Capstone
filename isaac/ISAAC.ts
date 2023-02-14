import type { Page, Revision, Category } from './models/index';
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/mongoose/MongooseDatabase';
import { CategoryOptions, PageOptions, RevisionOptions } from './ISAACOptions';
import { isErrorResponse } from './database/DatabaseInterface';

const database: Database = MongooseDatabase;

async function getPages(options: PageOptions) {
    const id = options.id;

    let response;

    if (id) {
        response = (await database.getLatestPages({ _id: id }));
    } else {
        response = (await database.getLatestPages({}));
    }

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Page[];

    return options.single ? payload[0] : payload;
}

async function getRevisions(options: RevisionOptions) {
    const parentId = options.parent_id;
    const id = options.id;

    let response;

    if (parentId) {
        response = (await database.getLatestRevisions({ rev_page_id: parentId }));
    } else {
        response = (await database.getLatestRevisions({ _id: id }));
    }

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Revision[];

    return options.single ? payload[0] : payload;
}

async function getCategories(options: CategoryOptions) {
    const id = options.id;

    let response;

    if (id) {
        response = (await database.getLatestCategories({ _id: id }));
    } else {
        response = (await database.getLatestCategories({}));
    }

    if (isErrorResponse(response)) throw response.error;

    const payload = response.payload as Category[];

    return options.single ? payload[0] : payload;
}

async function addNewPage(p: Page) {
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