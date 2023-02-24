export default interface User {
    role: UserRole,
    standing: UserStanding,
    major: UserMajor,
    name: string
}

export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student'
}

export enum UserStanding {
    FRESHMAN = 'freshman',
    SOPHOMORE = 'sophomore',
    JUNIOR = 'junior',
    SENIOR = 'senior'
}

export enum UserMajor {
    COMPUTER_SCIENCE = 'computer science',
    COMPUTER_ENGINEERING = 'computer engineering',
    INFORMATICS = 'informatics',
    OTHER = 'other'
}