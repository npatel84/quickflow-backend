export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class UserType {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
