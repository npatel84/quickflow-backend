import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { CreateColumnInput } from './dto/create-column.input';
import { Board, BoardColumn, User } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<Board[]> {
    return this.prisma.board.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } }
        ],
      },
      include: {
        owner: true,
        members: true,
        columns: {
          include: {
            tasks: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: {
        owner: true,
        members: true,
        columns: {
          include: {
            tasks: {
              include: {
                assignees: true,
                creator: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    const isUserAuthorized = board.ownerId === userId || 
      board.members.some(member => member.id === userId);

    if (!isUserAuthorized) {
      throw new ForbiddenException('You do not have access to this board');
    }

    return board;
  }

  async create(createBoardInput: CreateBoardInput, userId: string): Promise<Board> {
    const { name, description, memberIds } = createBoardInput;

    return this.prisma.board.create({
      data: {
        name,
        description,
        owner: {
          connect: { id: userId },
        },
        members: {
          connect: memberIds ? memberIds.map(id => ({ id })) : [],
        },
        columns: {
          create: [
            { name: 'To Do', order: 0 },
            { name: 'In Progress', order: 1 },
            { name: 'Done', order: 2 },
          ],
        },
      },
      include: {
        owner: true,
        members: true,
        columns: true,
      },
    });
  }

  async update(updateBoardInput: UpdateBoardInput, userId: string): Promise<Board> {
    const { id, name, description, memberIds } = updateBoardInput;

    // Check if board exists and user is owner
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can update it');
    }

    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    
    // Update members if provided
    if (memberIds) {
      updateData.members = {
        set: [], // Clear existing connections
        connect: memberIds.map(id => ({ id })),
      };
    }

    return this.prisma.board.update({
      where: { id },
      data: updateData,
      include: {
        owner: true,
        members: true,
        columns: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async addMember(boardId: string, memberId: string, userId: string): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can add members');
    }

    return this.prisma.board.update({
      where: { id: boardId },
      data: {
        members: {
          connect: { id: memberId },
        },
      },
      include: {
        owner: true,
        members: true,
        columns: true,
      },
    });
  }

  async removeMember(boardId: string, memberId: string, userId: string): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can remove members');
    }

    if (board.ownerId === memberId) {
      throw new ForbiddenException('Cannot remove the board owner');
    }

    return this.prisma.board.update({
      where: { id: boardId },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
      include: {
        owner: true,
        members: true,
        columns: true,
      },
    });
  }

  async delete(id: string, userId: string): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can delete it');
    }

    return this.prisma.board.delete({
      where: { id },
      include: {
        owner: true,
        members: true,
        columns: true,
      },
    });
  }

  async createColumn(createColumnInput: CreateColumnInput, userId: string): Promise<BoardColumn> {
    const { name, order, boardId } = createColumnInput;

    // Check if board exists and user is owner
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can add columns');
    }

    return this.prisma.boardColumn.create({
      data: {
        name,
        order,
        board: {
          connect: { id: boardId },
        },
      },
    });
  }

  async updateColumn(
    id: string, 
    name: string | undefined,
    order: number | undefined, 
    userId: string
  ): Promise<BoardColumn> {
    const column = await this.prisma.boardColumn.findUnique({
      where: { id },
      include: { board: true },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    if (column.board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can update columns');
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    return this.prisma.boardColumn.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteColumn(id: string, userId: string): Promise<BoardColumn> {
    const column = await this.prisma.boardColumn.findUnique({
      where: { id },
      include: { board: true },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    if (column.board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can delete columns');
    }

    // Check if this is the last column
    const columnsCount = await this.prisma.boardColumn.count({
      where: { boardId: column.boardId },
    });

    if (columnsCount <= 1) {
      throw new ForbiddenException('Cannot delete the last column of a board');
    }

    return this.prisma.boardColumn.delete({
      where: { id },
    });
  }
} 