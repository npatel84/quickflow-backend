import { UserType } from '../../users/dto/user.type';
import { BoardColumnType } from './board-column.type';
export declare class BoardType {
    id: string;
    name: string;
    description?: string;
    owner: UserType;
    ownerId: string;
    members: UserType[];
    columns: BoardColumnType[];
    createdAt: Date;
    updatedAt: Date;
}
