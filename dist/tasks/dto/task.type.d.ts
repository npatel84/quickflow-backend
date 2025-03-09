import { UserType } from '../../users/dto/user.type';
import { CommentType } from '../../comments/dto/comment.type';
import { AttachmentType } from './attachment.type';
export declare class TaskType {
    id: string;
    title: string;
    description?: string;
    priority: string;
    columnId: string;
    creator: UserType;
    creatorId: string;
    assignees: UserType[];
    dueDate?: Date;
    comments: CommentType[];
    attachments: AttachmentType[];
    createdAt: Date;
    updatedAt: Date;
}
