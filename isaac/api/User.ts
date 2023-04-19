import { BaseOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { User } from "../models";

export interface UserOptions extends BaseOptions {
    email?: string;
}

export const UserAPI = {
    get: async (options: UserOptions) => {
        let response;
    
        response = (await MongooseDatabaseAPI.User.get(options, {}));
    
        if (isErrorResponse(response)) throw response.error;
    
        const payload = response.payload as User[];
    
        return options.single ? payload[0] : payload;
    },

    add: async (u: User) => {
        const response = (await MongooseDatabaseAPI.User.add(u));
    
        if (isErrorResponse(response)) throw response.error;
    
        const resultUser = response.payload as User;
    
        if (!resultUser) throw new Error('Error adding new user.');
    
        return resultUser;
    },

    update: async (u_id: string, attributes: Partial<User>) => {
        const response = (await MongooseDatabaseAPI.User.update(u_id, attributes));
    
        if (isErrorResponse(response)) throw response.error;
    
        const resultUser = response.payload as User;
    
        if (!resultUser) throw new Error('Error updating user.');
    
        return resultUser;
    }
}