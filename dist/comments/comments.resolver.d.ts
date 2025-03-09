import { CommentsService } from './comments.service';
import { User } from '@prisma/client';
export declare class CommentsResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    comments(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        taskId: string;
        authorId: string;
    }[]>;
    createComment(content: string, taskId: string, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        taskId: string;
        authorId: string;
    }>;
    deleteComment(id: string, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        taskId: string;
        authorId: string;
    }>;
}
