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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BoardsService = class BoardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException(`Board with ID ${id} not found`);
        }
        const isUserAuthorized = board.ownerId === userId ||
            board.members.some(member => member.id === userId);
        if (!isUserAuthorized) {
            throw new common_1.ForbiddenException('You do not have access to this board');
        }
        return board;
    }
    async create(createBoardInput, userId) {
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
    async update(updateBoardInput, userId) {
        const { id, name, description, memberIds } = updateBoardInput;
        const board = await this.prisma.board.findUnique({
            where: { id },
            include: { members: true },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${id} not found`);
        }
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can update it');
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (description !== undefined)
            updateData.description = description;
        if (memberIds) {
            updateData.members = {
                set: [],
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
    async addMember(boardId, memberId, userId) {
        const board = await this.prisma.board.findUnique({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${boardId} not found`);
        }
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can add members');
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
    async removeMember(boardId, memberId, userId) {
        const board = await this.prisma.board.findUnique({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${boardId} not found`);
        }
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can remove members');
        }
        if (board.ownerId === memberId) {
            throw new common_1.ForbiddenException('Cannot remove the board owner');
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
    async delete(id, userId) {
        const board = await this.prisma.board.findUnique({
            where: { id },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${id} not found`);
        }
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can delete it');
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
    async createColumn(createColumnInput, userId) {
        const { name, order, boardId } = createColumnInput;
        const board = await this.prisma.board.findUnique({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${boardId} not found`);
        }
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can add columns');
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
    async updateColumn(id, name, order, userId) {
        const column = await this.prisma.boardColumn.findUnique({
            where: { id },
            include: { board: true },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID ${id} not found`);
        }
        if (column.board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can update columns');
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (order !== undefined)
            updateData.order = order;
        return this.prisma.boardColumn.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteColumn(id, userId) {
        const column = await this.prisma.boardColumn.findUnique({
            where: { id },
            include: { board: true },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID ${id} not found`);
        }
        if (column.board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can delete columns');
        }
        const columnsCount = await this.prisma.boardColumn.count({
            where: { boardId: column.boardId },
        });
        if (columnsCount <= 1) {
            throw new common_1.ForbiddenException('Cannot delete the last column of a board');
        }
        return this.prisma.boardColumn.delete({
            where: { id },
        });
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map