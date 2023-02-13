import type { Page, Revision, Category } from './models/index';
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/mongoose/MongooseDatabase';
import { CategoryOptions, PageOptions, RevisionOptions } from './ISAACOptions';

const database: Database = MongooseDatabase;

async function getPages(options: PageOptions) {
    const id = options.id;
    const isSingle = options.single;

    let payload: Page[];

    if (id) {
        payload = (await database.getLatestPages({ _id: id })).payload as Page[];
    } else {
       payload = (await database.getLatestPages({})).payload as Page[];
    }

    return isSingle ? payload[0] : payload;
}

async function getRevisions(options: RevisionOptions) {
    const parentId = options.parent_id;
    const id = options.id;
    const isSingle = options.single;

    let payload: Revision[];

    if (parentId) {
        payload = (await database.getLatestRevisions({ rev_page_id: id })).payload as Revision[];
    } else if (id) {
        payload = (await database.getLatestRevisions({ _id: id })).payload as Revision[];
    } else {
        // error
        payload = [];
    }

    return isSingle ? payload[0] : payload;
}

async function getCategories(options: CategoryOptions) {
    const id = options.id;
    const isSingle = options.single;

    let payload: Category[];

    if (id) {
        payload = (await database.getLatestCategories({ _id: id })).payload as Category[];
    } else {
       payload = (await database.getLatestCategories({})).payload as Category[];
    }

    return isSingle ? payload[0] : payload;
}

async function addNewPage(p: Page) {
    const pageId: string = (await database.addPage(p)).payload as string;

    if (!pageId) throw new Error('Error adding new page.');

    return pageId;
}

async function addNewRevision(r: Revision) {
    const revId: string = (await database.addRevision(r)).payload as string;

    if (!revId) throw new Error('Error adding new revision.');

    return revId;
}

async function addNewCategory(c: Category) {
    const catId: string = (await database.addCategory(c)).payload as string;

    if (!catId) throw new Error('Error adding new category.');

    return catId;
}

export default {
    getPages: getPages,
    getRevisions: getRevisions,
    getCategories: getCategories,
    addNewPage: addNewPage,
    addNewRevision: addNewRevision,
    addNewCategory: addNewCategory
};