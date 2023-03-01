import type { Page, Revision, Category } from '../../models/index';
import Database from "../DatabaseInterface";
import MongooseModels from './MongooseModels';
import connectToDatabase from './MongooseProvider';

try {
    await connectToDatabase();
} catch (err) {
    throw err;
}

const MongooseDatabase: Database = {
    getLatestPages: async (query: any) => {
        try {
            const data = await MongooseModels.Page
                .find(query)
                .sort({ created_at: -1 });

            const pages = data.map((raw) => {
                const page: Page = {
                    id: raw._doc._id,
                    title: raw._doc.title,
                    page_category_id: raw._doc.page_category_id,
                    created_at: raw._doc.created_at,
                    headings: raw._doc.headings ?? []
                };

                return page;
            });
    
            return {
                success: true,
                payload: pages
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getLatestRevisions: async (query: any) => {
        try {
            const data = await MongooseModels.Revision
                .find(query)
                .sort({ created_at: -1 });

            const revs = data.map((raw) => {
                const rev: Revision = {
                    id: raw._doc._id,
                    content: raw._doc.content,
                    created_at: raw._doc.created_at,
                    rev_page_id: raw._doc.rev_page_id
                };

                return rev;
            });
    
            return {
                success: true,
                payload: revs
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getLatestCategories: async (query: any) => {
        try {
            const data = await MongooseModels.Category
                .find(query)
                .sort({ created_at: -1 });

            const cats = data.map((raw) => {
                const cat: Category = {
                    id: raw._doc._id,
                    name: raw._doc.name,
                    created_at: raw._doc.created_at
                };

                return cat;
            });
    
            return {
                success: true,
                payload: cats
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addPage: async (p: Page) => {
        try {
            const page = new MongooseModels.Page(p);
            await page.validate();
            await page.save();

            return {
                success: true,
                payload: page._id.toString()
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addRevision: async (r: Revision) => {
        try {
            const rev = new MongooseModels.Revision(r);
            await rev.validate();
            await rev.save();
    
            return {
                success: true,
                payload: rev._id.toString()
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addCategory: async (c: Category) => {
        try {
            const cat = new MongooseModels.Category(c);
            await cat.validate();
            await cat.save();
    
            return {
                success: true,
                payload: cat._id.toString()
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getLatestUsers: async (query: any) => {
        try {
            const data = await MongooseModels.User
                .find(query)
                .sort({ created_at: -1 });

            const users = data.map((raw) => {
                const user = {
                    id: raw._id,
                    role: raw.role,
                    standing: raw.standing,
                    major: raw.major,
                    name: raw.name
                };
                return user;
            });
    
            return {
                success: true,
                payload: users
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addNewUser: async (user: any) => {
        try {
            const newUser = new MongooseModels.User(user);
            await newUser.validate();
            await newUser.save();
    
            return {
                success: true,
                payload: newUser._id.toString()
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    updateUser: async (user: any) => {
        try {
            const userId = user.id;
            delete user.id;
            
            const updatedUser = await MongooseModels.User.findByIdAndUpdate(userId, user, { new: true });
            
            return {
                success: true,
                payload: updatedUser
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
};

export default MongooseDatabase;