import { TaskPriority } from '@prisma/client';
export declare class UpdateTaskInput {
    id: string;
    title?: string;
    description?: string;
    priority?: TaskPriority;
    columnId?: string;
    assigneeIds?: string[];
    dueDate?: string;
}
