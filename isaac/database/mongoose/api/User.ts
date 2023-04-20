import { User } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";

// only used for the firebase flavor
export const UserModelAPI: ModelAPI<User> = {
    get: async (query: any, sort: any) => {
        try {
            const data = await MongooseModels.User
                .find(query)
                .sort(sort);

            const users: User[] = data.map((raw) => {
                const user = {
                    id: raw._id.toString(),
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

    add: async (u: User) => {
        try {
            const newUser = new MongooseModels.User(u);
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

    update: async (u: any) => {
        try {
            const userId = u.id;
            delete u.id;
            
            const updatedUser = await MongooseModels.User.findByIdAndUpdate(userId, u, { new: true });
            
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

    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => {
        try {
            const data = await MongooseModels.User
                .aggregate()
                .group(groupOptions)
                .sort(sortOptions)
                .lookup(lookupOptions);
            
            return {
                success: true,
                payload: data
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },
    
    delete: (id: string) => { throw new Error('Not implemented') }
}
