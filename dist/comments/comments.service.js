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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(taskId) {
        return this.prisma.comment.findMany({
            where: { taskId },
            include: { author: true },
            orderBy: { createdAt: 'asc' },
        });
    }
    async create(content, taskId, authorId) {
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
        const isBoardMember = task.column.board.ownerId === authorId ||
            task.column.board.members.some(member => member.id === authorId);
        if (!isBoardMember) {
            throw new common_1.ForbiddenException('You do not have permission to comment on this task');
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
    async delete(id, userId) {
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
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        const isAuthor = comment.authorId === userId;
        const isBoardOwner = comment.task.column.board.ownerId === userId;
        if (!isAuthor && !isBoardOwner) {
            throw new common_1.ForbiddenException('You do not have permission to delete this comment');
        }
        return this.prisma.comment.delete({
            where: { id },
            include: { author: true },
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map