export default interface User {
    email: string;
    created_at: number;
}

export interface ClientUserRequest {
    email: string;
}

export interface ServerUserRequest {
    created_at: number;
}
