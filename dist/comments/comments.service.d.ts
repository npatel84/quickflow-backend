import { PrismaService } from '../prisma/prisma.service';
import { Comment } from '@prisma/client';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(taskId: string): Promise<Comment[]>;
    create(content: string, taskId: string, authorId: string): Promise<Comment>;
    delete(id: string, userId: string): Promise<Comment>;
}
