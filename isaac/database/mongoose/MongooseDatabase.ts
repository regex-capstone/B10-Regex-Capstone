import type { Page, Revision, Category, SearchIndex } from '../../models/index';
import Metric from '../../analytics/model'
import Database from "../DatabaseInterface";
import MongooseModels from './MongooseModels';
import connectToDatabase from './MongooseProvider';
import { UpdatePageOptions } from '@/isaac/ISAACOptions';

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
                    id: raw._id,
                    title: raw.title,
                    page_category_id: raw.page_category_id,
                    created_at: raw.created_at,
                    headings: raw.headings ?? [],
                    description: raw.description ?? ''
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
                    id: raw._id,
                    content: raw.content,
                    created_at: raw.created_at,
                    rev_page_id: raw.rev_page_id
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
                payload: page
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
                payload: rev
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
                payload: cat
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    updatePage: async (id: string, query: UpdatePageOptions) => {
        try {
            let page = await MongooseModels.Page.findById(id);
            for (const key in query) {
                // @ts-ignore
                page[key] = query[key] as any;
            }
            await page.save();
            

            return {
                success: true,
                payload: page
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    getAnalytics: async (query: Object) => {
        try {
            const data = await MongooseModels.Metric
                .find(query);

            console.log(data);

            const metrics = data.map((raw) => {
                const metric: Metric = {
                    met_page_id: raw.id,
                    created_at: raw.created_at,
                    major: raw.major,
                    standing: raw.standing
                };

                return metric;
            });
    
            return {
                success: true,
                payload: metrics
            };
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    addAnalytic: async (m: Metric) => {
        try {
            const met = new MongooseModels.Metric(m);
            await met.validate();
            await met.save();

            return {
                success: true,
                payload: met._id.toString()
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
                    name: raw.name,
                    email: raw.email
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
                payload: newUser
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

    // getLatestSearchIndices: async () => {
    //     try {
    //         const data = await MongooseModels.SearchIndex
    //             .find()
    //             .sort({ created_at: -1 });

    //         const indices = data.map((raw) => {
    //             const index: SearchIndex = {
    //                 data: raw.data,
    //                 created_at: raw.created_at
    //             };

    //             return index;
    //         });
    
    //         return {
    //             success: true,
    //             payload: indices
    //         };
    //     } catch (err: any) {
    //         return {
    //             error: err
    //         }
    //     }
    // },

    // addSearchIndex: async (s: SearchIndex) => {
    //     try {
    //         const index = new MongooseModels.SearchIndex(s);
    //         await index.validate();
    //         await index.save();
            
    //         return {
    //             success: true,
    //             payload: index
    //         }
    //     } catch (err: any) {
    //         return {
    //             error: err
    //         }
    //     }
    // },
};

export default MongooseDatabase;