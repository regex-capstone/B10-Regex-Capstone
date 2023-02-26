export default interface User {
    role: UserRole,
    name: string
}

export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student'
}