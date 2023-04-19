import ISAACAPI from "@/isaac/ISAACAPI";
import { User } from "@/isaac/models";


export default interface UserPublicAPIInterface {
    get(get_type: GetUserTypes, get_options?: GetUserOptions): Promise<User>,
    add(u: User): Promise<User>,
    update(u: User): Promise<User>
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

    add: async (u: User) => {
        return (await isaac.User.add({
            ...u,
            created_at: Date.now()
        })) as User;
    },

    update: async (u: User) => {
        return (await isaac.User.update(u.id as string, { ...u }));
    }
}
