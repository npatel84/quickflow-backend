import { TaskType } from '../../tasks/dto/task.type';
export declare class BoardColumnType {
    id: string;
    name: string;
    order: number;
    boardId: string;
    tasks: TaskType[];
    createdAt: Date;
    updatedAt: Date;
}
