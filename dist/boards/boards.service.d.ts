import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { CreateColumnInput } from './dto/create-column.input';
import { Board, BoardColumn } from '@prisma/client';
export declare class BoardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<Board[]>;
    findOne(id: string, userId: string): Promise<Board>;
    create(createBoardInput: CreateBoardInput, userId: string): Promise<Board>;
    update(updateBoardInput: UpdateBoardInput, userId: string): Promise<Board>;
    addMember(boardId: string, memberId: string, userId: string): Promise<Board>;
    removeMember(boardId: string, memberId: string, userId: string): Promise<Board>;
    delete(id: string, userId: string): Promise<Board>;
    createColumn(createColumnInput: CreateColumnInput, userId: string): Promise<BoardColumn>;
    updateColumn(id: string, name: string | undefined, order: number | undefined, userId: string): Promise<BoardColumn>;
    deleteColumn(id: string, userId: string): Promise<BoardColumn>;
}
