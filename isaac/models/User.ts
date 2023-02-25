export default interface User {
    id?: string;
    role: UserRole,
    standing: UserStanding,
    major: UserMajor,
    created_at: number,
    name: string,
    email: string
}

export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student'
}

// @TODO
// graduating senior status? 
// skip for now -> after 5 page you repop it
// unknown is a valid option
export enum UserStanding {
    UNKNOWN = 'unknown',
    FRESHMAN = 'freshman',
    SOPHOMORE = 'sophomore',
    JUNIOR = 'junior',
    SENIOR = 'senior'
}

export enum UserMajor {
    UNKNOWN = 'unknown',
    COMPUTER_SCIENCE = 'computer science',
    COMPUTER_ENGINEERING = 'computer engineering',
    INFORMATICS = 'informatics',
    OTHER = 'other'
}
