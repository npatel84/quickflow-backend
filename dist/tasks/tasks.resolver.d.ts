import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from '@prisma/client';
export declare class TasksResolver {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    tasks(user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }[]>;
    task(id: string, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }>;
    createTask(createTaskInput: CreateTaskInput, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }>;
    updateTask(updateTaskInput: UpdateTaskInput, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }>;
    deleteTask(id: string, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }>;
    addTaskAssignee(taskId: string, userId: string, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }>;
    removeTaskAssignee(taskId: string, userId: string, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        columnId: string;
        creatorId: string;
        dueDate: Date | null;
    }>;
}
