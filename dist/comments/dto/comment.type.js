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
exports.CommentType = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("../../users/dto/user.type");
let CommentType = class CommentType {
};
exports.CommentType = CommentType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CommentType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommentType.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CommentType.prototype, "taskId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], CommentType.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CommentType.prototype, "authorId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CommentType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CommentType.prototype, "updatedAt", void 0);
exports.CommentType = CommentType = __decorate([
    (0, graphql_1.ObjectType)()
], CommentType);
//# sourceMappingURL=comment.type.js.map