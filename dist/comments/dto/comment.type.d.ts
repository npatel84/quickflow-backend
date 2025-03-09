import { UserType } from '../../users/dto/user.type';
export declare class CommentType {
    id: string;
    content: string;
    taskId: string;
    author: UserType;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}
