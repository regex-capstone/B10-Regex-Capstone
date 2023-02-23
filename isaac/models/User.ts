export default interface User {
    role: UserRole,
    givenName: string,
    title: string
}

export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student'
}