import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { assignees: { some: { id: userId } } },
          {
            column: {
              board: {
                OR: [
                  { ownerId: userId },
                  { members: { some: { id: userId } } },
                ],
              },
            },
          },
        ],
      },
      include: {
        creator: true,
        assignees: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        attachments: true,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        creator: true,
        assignees: true,
        column: {
          include: {
            board: {
              include: {
                owner: true,
                members: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        attachments: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const board = task.column.board;
    const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);

    if (!isBoardMember) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async create(createTaskInput: CreateTaskInput, userId: string): Promise<Task> {
    const { title, description, priority, columnId, assigneeIds, dueDate } = createTaskInput;

    // Verify column exists and user has access to it
    const column = await this.prisma.boardColumn.findUnique({
      where: { id: columnId },
      include: {
        board: {
          include: {
            owner: true,
            members: true,
          },
        },
      },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${columnId} not found`);
    }

    const board = column.board;
    const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);

    if (!isBoardMember) {
      throw new ForbiddenException('You do not have access to this board');
    }

    // Create the task
    return this.prisma.task.create({
      data: {
        title,
        description,
        priority,
        column: {
          connect: { id: columnId },
        },
        creator: {
          connect: { id: userId },
        },
        assignees: {
          connect: assigneeIds ? assigneeIds.map(id => ({ id })) : [],
        },
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
      include: {
        creator: true,
        assignees: true,
        comments: true,
        attachments: true,
      },
    });
  }

  async update(updateTaskInput: UpdateTaskInput, userId: string): Promise<Task> {
    const { id, title, description, priority, columnId, assigneeIds, dueDate } = updateTaskInput;

    // Check if task exists
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        column: {
          include: {
            board: {
              include: {
                owner: true,
                members: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check if user has access to the board
    const board = task.column.board;
    const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);

    if (!isBoardMember) {
      throw new ForbiddenException('You do not have access to this board');
    }

    // If moving to a different column, verify the column exists and is on the same board
    if (columnId && columnId !== task.columnId) {
      const newColumn = await this.prisma.boardColumn.findUnique({
        where: { id: columnId },
        include: { board: true },
      });

      if (!newColumn) {
        throw new NotFoundException(`Column with ID ${columnId} not found`);
      }

      if (newColumn.boardId !== board.id) {
        throw new ForbiddenException('Cannot move task to a column on a different board');
      }
    }

    // Update the task
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (columnId !== undefined) updateData.column = { connect: { id: columnId } };
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    // Update assignees if provided
    if (assigneeIds !== undefined) {
      updateData.assignees = {
        set: [], // Clear existing connections
        connect: assigneeIds.map(id => ({ id })),
      };
    }

    return this.prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        creator: true,
        assignees: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        attachments: true,
      },
    });
  }

  async delete(id: string, userId: string): Promise<Task> {
    // Check if task exists
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        column: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Only allow task creator or board owner to delete
    if (task.creatorId !== userId && task.column.board.ownerId !== userId) {
      throw new ForbiddenException('Only the task creator or board owner can delete this task');
    }

    return this.prisma.task.delete({
      where: { id },
      include: {
        creator: true,
        assignees: true,
        comments: true,
        attachments: true,
      },
    });
  }

  async addAssignee(taskId: string, assigneeId: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        column: {
          include: {
            board: {
              include: {
                members: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    // Check if user has permission (is board member)
    const board = task.column.board;
    const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
    
    if (!isBoardMember) {
      throw new ForbiddenException('You do not have access to this board');
    }

    // Check if assignee is a board member
    const isAssigneeBoardMember = board.ownerId === assigneeId || 
      board.members.some(member => member.id === assigneeId);
    
    if (!isAssigneeBoardMember) {
      throw new ForbiddenException('Assignee must be a member of the board');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          connect: { id: assigneeId },
        },
      },
      include: {
        creator: true,
        assignees: true,
        comments: true,
        attachments: true,
      },
    });
  }

  async removeAssignee(taskId: string, assigneeId: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        column: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    // Check if user has permission (is board member or the assignee being removed)
    const board = await this.prisma.board.findUnique({
      where: { id: task.column.boardId },
      include: { members: true }
    });

    if (!board) {
      throw new NotFoundException(`Board not found for task ${taskId}`);
    }

    const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
    const isSelfRemoval = userId === assigneeId;
    
    if (!isBoardMember && !isSelfRemoval) {
      throw new ForbiddenException('You do not have permission to remove this assignee');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          disconnect: { id: assigneeId },
        },
      },
      include: {
        creator: true,
        assignees: true,
        comments: true,
        attachments: true,
      },
    });
  }
} 