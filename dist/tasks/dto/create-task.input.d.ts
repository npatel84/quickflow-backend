import { TaskPriority } from '@prisma/client';
export declare class CreateTaskInput {
    title: string;
    description?: string;
    priority: TaskPriority;
    columnId: string;
    assigneeIds?: string[];
    dueDate?: string;
}
