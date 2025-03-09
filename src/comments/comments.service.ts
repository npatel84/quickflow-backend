import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(taskId: string): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { taskId },
      include: { author: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(content: string, taskId: string, authorId: string): Promise<Comment> {
    // Verify task exists and user has access
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

    // Check if user is a board member or task creator
    const isBoardMember = 
      task.column.board.ownerId === authorId || 
      task.column.board.members.some(member => member.id === authorId);
    
    if (!isBoardMember) {
      throw new ForbiddenException('You do not have permission to comment on this task');
    }

    return this.prisma.comment.create({
      data: {
        content,
        task: { connect: { id: taskId } },
        author: { connect: { id: authorId } },
      },
      include: { author: true },
    });
  }

  async delete(id: string, userId: string): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { 
        author: true,
        task: {
          include: {
            column: {
              include: {
                board: true
              }
            }
          }
        }
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Check if user is the comment author or board owner
    const isAuthor = comment.authorId === userId;
    const isBoardOwner = comment.task.column.board.ownerId === userId;
    
    if (!isAuthor && !isBoardOwner) {
      throw new ForbiddenException('You do not have permission to delete this comment');
    }

    return this.prisma.comment.delete({
      where: { id },
      include: { author: true },
    });
  }
} 