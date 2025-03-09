import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from '@prisma/client';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<Task[]>;
    findOne(id: string, userId: string): Promise<Task>;
    create(createTaskInput: CreateTaskInput, userId: string): Promise<Task>;
    update(updateTaskInput: UpdateTaskInput, userId: string): Promise<Task>;
    delete(id: string, userId: string): Promise<Task>;
    addAssignee(taskId: string, assigneeId: string, userId: string): Promise<Task>;
    removeAssignee(taskId: string, assigneeId: string, userId: string): Promise<Task>;
}
