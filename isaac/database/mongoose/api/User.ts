import { User } from "@/isaac/models";
import { ModelAPI } from "../../DatabaseInterface";
import MongooseModels from "../MongooseModels";
import { ServerUserRequest } from "@/isaac/models/User";

// only used for the firebase flavor
export const UserModelAPI: ModelAPI<User, ServerUserRequest> = {
    get: async (query: any, sort: any) => {
        try {
            const data = await MongooseModels.User
                .find(query)
                .sort(sort);

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

    add: async (serverRequest: ServerUserRequest) => {
        try {
            const user = new MongooseModels.User(serverRequest);
            await user.validate();
            await user.save();

            const newUser = {
                ...user._doc,
                id: user._id
            }

            delete newUser._id;
    
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
