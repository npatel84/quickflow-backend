import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(createUserInput: CreateUserInput): Promise<User>;
    update(id: string, updateUserInput: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<User>;
    setRole(id: string, role: UserRole): Promise<User>;
}
