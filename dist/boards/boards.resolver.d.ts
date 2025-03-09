import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { CreateColumnInput } from './dto/create-column.input';
import { User } from '@prisma/client';
export declare class BoardsResolver {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    boards(user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }[]>;
    board(id: string, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }>;
    createBoard(createBoardInput: CreateBoardInput, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }>;
    updateBoard(updateBoardInput: UpdateBoardInput, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }>;
    deleteBoard(id: string, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }>;
    addBoardMember(boardId: string, userId: string, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }>;
    removeBoardMember(boardId: string, userId: string, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        ownerId: string;
    }>;
    createBoardColumn(createColumnInput: CreateColumnInput, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        boardId: string;
    }>;
    updateBoardColumn(id: string, name: string, order: number, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        boardId: string;
    }>;
    deleteBoardColumn(id: string, user: User): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        boardId: string;
    }>;
}
