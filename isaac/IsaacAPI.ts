import type { Page, User, Revision } from './models/index';
import type Database from './database/DatabaseInterface';
import MongooseDatabase from './database/mongoose/MongooseDatabase';

const database: Database = MongooseDatabase;

async function getPages() {
    return await database.getPages();
}

async function getPageByPId(p_id: string) {
    return (await database.getPages(p_id))[0];
}

async function addNewPage(p: Page) {
    // add a new page
    const pageId: string = await database.addPage(p);

    if (!pageId) {
        throw new Error('Error adding new page.');
    }

    return pageId;
}


async function getRevisionsByPId(p_id: string) {
    return await database.getRevisionsByPId(p_id);
}

async function getRevisionByRId(r_id: string) {
    return await database.getRevisionByRId(r_id);
}

async function addNewRevision(p_id: string, content: string) {
    const rev: Revision = {
        content: content,
        rev_page_id: p_id
    };

    return await database.addRevision(rev);;
}


// async function getUser(id: string): Promise<User> {
//   const user: User = await database.getUser(id);
//   return user;
// }

export default {
    getPages: getPages,
    getPageByPId: getPageByPId,
    addNewPage: addNewPage,
    getRevisionsByPId: getRevisionsByPId,
    getRevisionByRId: getRevisionByRId,
    addNewRevision: addNewRevision
};