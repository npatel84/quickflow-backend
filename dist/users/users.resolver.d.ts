import { UsersService } from './users.service';
import { User } from '@prisma/client';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: User): Promise<{
        email: string;
        name: string | null;
        password: string;
        avatar: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    users(): Promise<{
        email: string;
        name: string | null;
        password: string;
        avatar: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    user(id: string): Promise<{
        email: string;
        name: string | null;
        password: string;
        avatar: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
