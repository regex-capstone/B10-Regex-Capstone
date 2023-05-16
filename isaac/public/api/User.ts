import ISAACAPI from "@/isaac/ISAACAPI";
import { User } from "@/isaac/models";
import { ClientUserRequest, ServerUserRequest } from "@/isaac/models/User";


export default interface UserPublicAPIInterface {
    get(get_type: GetUserTypes, get_options?: GetUserOptions): Promise<User>,
    add(clientRequest: ClientUserRequest): Promise<boolean>,
    delete(options: any): Promise<any>
}

export enum GetUserTypes {
    USER_BY_EMAIL
}

export interface GetUserOptions {
    email?: string;
}

const isaac = ISAACAPI;

export const UserPublicAPI: UserPublicAPIInterface = {
    get: async (get_type: GetUserTypes, get_options?: GetUserOptions) => {
        switch (get_type) {
            case GetUserTypes.USER_BY_EMAIL:
                if (!get_options?.email) throw new Error('No email provided.');
                return (await isaac.User.get({ email: get_options?.email, single: true })) as User;

            default:
                throw new Error("Invalid get type.");
        }
    },

    add: async (clientRequest: ClientUserRequest) => {
        const serverRequest: ServerUserRequest = {
            ...clientRequest,
            created_at: Date.now()
        };

        const acknowledgement: boolean = await (isaac.User.add(serverRequest));

        if (!acknowledgement) throw new Error('Error adding new user.');

        return acknowledgement;
    },

    delete: async (options: any) => {
        return (await isaac.User.delete(options));
    }
}
