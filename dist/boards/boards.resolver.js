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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const board_type_1 = require("./dto/board.type");
const board_column_type_1 = require("./dto/board-column.type");
const create_board_input_1 = require("./dto/create-board.input");
const update_board_input_1 = require("./dto/update-board.input");
const create_column_input_1 = require("./dto/create-column.input");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let BoardsResolver = class BoardsResolver {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async boards(user) {
        return this.boardsService.findAll(user.id);
    }
    async board(id, user) {
        return this.boardsService.findOne(id, user.id);
    }
    async createBoard(createBoardInput, user) {
        return this.boardsService.create(createBoardInput, user.id);
    }
    async updateBoard(updateBoardInput, user) {
        return this.boardsService.update(updateBoardInput, user.id);
    }
    async deleteBoard(id, user) {
        return this.boardsService.delete(id, user.id);
    }
    async addBoardMember(boardId, userId, user) {
        return this.boardsService.addMember(boardId, userId, user.id);
    }
    async removeBoardMember(boardId, userId, user) {
        return this.boardsService.removeMember(boardId, userId, user.id);
    }
    async createBoardColumn(createColumnInput, user) {
        return this.boardsService.createColumn(createColumnInput, user.id);
    }
    async updateBoardColumn(id, name, order, user) {
        return this.boardsService.updateColumn(id, name, order, user.id);
    }
    async deleteBoardColumn(id, user) {
        return this.boardsService.deleteColumn(id, user.id);
    }
};
exports.BoardsResolver = BoardsResolver;
__decorate([
    (0, graphql_1.Query)(() => [board_type_1.BoardType]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "boards", null);
__decorate([
    (0, graphql_1.Query)(() => board_type_1.BoardType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "board", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_type_1.BoardType),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_input_1.CreateBoardInput, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "createBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_type_1.BoardType),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_board_input_1.UpdateBoardInput, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "updateBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_type_1.BoardType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "deleteBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_type_1.BoardType),
    __param(0, (0, graphql_1.Args)('boardId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "addBoardMember", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_type_1.BoardType),
    __param(0, (0, graphql_1.Args)('boardId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "removeBoardMember", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_column_type_1.BoardColumnType),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_column_input_1.CreateColumnInput, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "createBoardColumn", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_column_type_1.BoardColumnType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('name', { nullable: true })),
    __param(2, (0, graphql_1.Args)('order', { nullable: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "updateBoardColumn", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_column_type_1.BoardColumnType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "deleteBoardColumn", null);
exports.BoardsResolver = BoardsResolver = __decorate([
    (0, graphql_1.Resolver)(() => board_type_1.BoardType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsResolver);
//# sourceMappingURL=boards.resolver.js.map