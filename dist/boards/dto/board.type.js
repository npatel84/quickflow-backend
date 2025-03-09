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
exports.BoardType = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("../../users/dto/user.type");
const board_column_type_1 = require("./board-column.type");
let BoardType = class BoardType {
};
exports.BoardType = BoardType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], BoardType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BoardType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], BoardType.prototype, "owner", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BoardType.prototype, "ownerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_type_1.UserType]),
    __metadata("design:type", Array)
], BoardType.prototype, "members", void 0);
__decorate([
    (0, graphql_1.Field)(() => [board_column_type_1.BoardColumnType]),
    __metadata("design:type", Array)
], BoardType.prototype, "columns", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BoardType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BoardType.prototype, "updatedAt", void 0);
exports.BoardType = BoardType = __decorate([
    (0, graphql_1.ObjectType)()
], BoardType);
//# sourceMappingURL=board.type.js.map