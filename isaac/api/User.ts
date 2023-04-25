import { BaseOptions } from "../ISAACOptions";
import { isErrorResponse } from "../database/DatabaseInterface";
import MongooseDatabaseAPI from "../database/mongoose/MongooseAPI";
import { User } from "../models";
import { ServerUserRequest } from "../models/User";

export interface UserOptions extends BaseOptions {
    email?: string;
}

const database = MongooseDatabaseAPI;

export const UserAPI = {
    get: async (options: UserOptions) => {
        let response;
    
        response = (await database.User.get(options, {}));
    
        if (isErrorResponse(response)) throw response.error;
    
        const payload = response.payload as User[];
    
        return options.single ? payload[0] : payload;
    },

    add: async (serverRequest: ServerUserRequest) => {
        const response = (await database.User.add(serverRequest));
    
        if (isErrorResponse(response)) throw response.error;
    
        const acknowledgement = response.success as boolean;
    
        if (!acknowledgement) throw new Error('Error adding new user.');
    
        return acknowledgement;
    },

    update: async (u_id: string, attributes: Partial<User>) => {
        const response = (await database.User.update(u_id, attributes));
    
        if (isErrorResponse(response)) throw response.error;
    
        const resultUser = response.payload as User;
    
        if (!resultUser) throw new Error('Error updating user.');
    
        return resultUser;
    }
}