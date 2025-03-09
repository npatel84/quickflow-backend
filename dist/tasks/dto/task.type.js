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
exports.TaskType = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("../../users/dto/user.type");
const comment_type_1 = require("../../comments/dto/comment.type");
const attachment_type_1 = require("./attachment.type");
let TaskType = class TaskType {
};
exports.TaskType = TaskType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TaskType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TaskType.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TaskType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TaskType.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TaskType.prototype, "columnId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], TaskType.prototype, "creator", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TaskType.prototype, "creatorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_type_1.UserType]),
    __metadata("design:type", Array)
], TaskType.prototype, "assignees", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], TaskType.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [comment_type_1.CommentType]),
    __metadata("design:type", Array)
], TaskType.prototype, "comments", void 0);
__decorate([
    (0, graphql_1.Field)(() => [attachment_type_1.AttachmentType]),
    __metadata("design:type", Array)
], TaskType.prototype, "attachments", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], TaskType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], TaskType.prototype, "updatedAt", void 0);
exports.TaskType = TaskType = __decorate([
    (0, graphql_1.ObjectType)()
], TaskType);
//# sourceMappingURL=task.type.js.map