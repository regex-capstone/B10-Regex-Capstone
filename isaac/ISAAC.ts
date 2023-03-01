import type { Page, Revision, Category, User } from './models/index';
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/mongoose/MongooseDatabase';
import { CategoryOptions, PageOptions, RevisionOptions, BaseOptions, UserOptions } from './ISAACOptions';
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

export default {
    getPages: getPages,
    getRevisions: getRevisions,
    getCategories: getCategories,
    addNewPage: addNewPage,
    addNewRevision: addNewRevision,
    addNewCategory: addNewCategory,
    getUsers: getUsers,
    addNewUser: addNewUser,
    updateUser: updateUser
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

