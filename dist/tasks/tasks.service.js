"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        const board = task.column.board;
        const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
        if (!isBoardMember) {
            throw new common_1.ForbiddenException('You do not have access to this task');
        }
        return task;
    }
    async create(createTaskInput, userId) {
        const { title, description, priority, columnId, assigneeIds, dueDate } = createTaskInput;
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
            throw new common_1.NotFoundException(`Column with ID ${columnId} not found`);
        }
        const board = column.board;
        const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
        if (!isBoardMember) {
            throw new common_1.ForbiddenException('You do not have access to this board');
        }
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
    async update(updateTaskInput, userId) {
        const { id, title, description, priority, columnId, assigneeIds, dueDate } = updateTaskInput;
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
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        const board = task.column.board;
        const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
        if (!isBoardMember) {
            throw new common_1.ForbiddenException('You do not have access to this board');
        }
        if (columnId && columnId !== task.columnId) {
            const newColumn = await this.prisma.boardColumn.findUnique({
                where: { id: columnId },
                include: { board: true },
            });
            if (!newColumn) {
                throw new common_1.NotFoundException(`Column with ID ${columnId} not found`);
            }
            if (newColumn.boardId !== board.id) {
                throw new common_1.ForbiddenException('Cannot move task to a column on a different board');
            }
        }
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description;
        if (priority !== undefined)
            updateData.priority = priority;
        if (columnId !== undefined)
            updateData.column = { connect: { id: columnId } };
        if (dueDate !== undefined)
            updateData.dueDate = dueDate ? new Date(dueDate) : null;
        if (assigneeIds !== undefined) {
            updateData.assignees = {
                set: [],
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
    async delete(id, userId) {
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
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        if (task.creatorId !== userId && task.column.board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the task creator or board owner can delete this task');
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
    async addAssignee(taskId, assigneeId, userId) {
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
            throw new common_1.NotFoundException(`Task with ID ${taskId} not found`);
        }
        const board = task.column.board;
        const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
        if (!isBoardMember) {
            throw new common_1.ForbiddenException('You do not have access to this board');
        }
        const isAssigneeBoardMember = board.ownerId === assigneeId ||
            board.members.some(member => member.id === assigneeId);
        if (!isAssigneeBoardMember) {
            throw new common_1.ForbiddenException('Assignee must be a member of the board');
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
    async removeAssignee(taskId, assigneeId, userId) {
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
            throw new common_1.NotFoundException(`Task with ID ${taskId} not found`);
        }
        const board = await this.prisma.board.findUnique({
            where: { id: task.column.boardId },
            include: { members: true }
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board not found for task ${taskId}`);
        }
        const isBoardMember = board.ownerId === userId || board.members.some(member => member.id === userId);
        const isSelfRemoval = userId === assigneeId;
        if (!isBoardMember && !isSelfRemoval) {
            throw new common_1.ForbiddenException('You do not have permission to remove this assignee');
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map