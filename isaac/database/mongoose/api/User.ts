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
    
            return {
                success: true
            }
        } catch (err: any) {
            return {
                error: err
            }
        }
    },

    update: async (u: any) => { throw new Error('Not implemented'); },
    aggregate: async (groupOptions: any, sortOptions: any, lookupOptions: any) => { throw new Error('Not implemented'); },
    delete: (id: string) => { throw new Error('Not implemented'); }
}
