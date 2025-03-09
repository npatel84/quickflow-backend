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
exports.TokenResponseDto = exports.UserDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let UserDto = class UserDto {
};
exports.UserDto = UserDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
exports.UserDto = UserDto = __decorate([
    (0, graphql_1.ObjectType)()
], UserDto);
let TokenResponseDto = class TokenResponseDto {
};
exports.TokenResponseDto = TokenResponseDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserDto),
    __metadata("design:type", UserDto)
], TokenResponseDto.prototype, "user", void 0);
exports.TokenResponseDto = TokenResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], TokenResponseDto);
//# sourceMappingURL=token-response.dto.js.map