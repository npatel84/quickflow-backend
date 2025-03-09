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
exports.TasksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_type_1 = require("./dto/task.type");
const create_task_input_1 = require("./dto/create-task.input");
const update_task_input_1 = require("./dto/update-task.input");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let TasksResolver = class TasksResolver {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async tasks(user) {
        return this.tasksService.findAll(user.id);
    }
    async task(id, user) {
        return this.tasksService.findOne(id, user.id);
    }
    async createTask(createTaskInput, user) {
        return this.tasksService.create(createTaskInput, user.id);
    }
    async updateTask(updateTaskInput, user) {
        return this.tasksService.update(updateTaskInput, user.id);
    }
    async deleteTask(id, user) {
        return this.tasksService.delete(id, user.id);
    }
    async addTaskAssignee(taskId, userId, user) {
        return this.tasksService.addAssignee(taskId, userId, user.id);
    }
    async removeTaskAssignee(taskId, userId, user) {
        return this.tasksService.removeAssignee(taskId, userId, user.id);
    }
};
exports.TasksResolver = TasksResolver;
__decorate([
    (0, graphql_1.Query)(() => [task_type_1.TaskType]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "tasks", null);
__decorate([
    (0, graphql_1.Query)(() => task_type_1.TaskType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "task", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_type_1.TaskType),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_input_1.CreateTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_type_1.TaskType),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_input_1.UpdateTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "updateTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_type_1.TaskType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "deleteTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_type_1.TaskType),
    __param(0, (0, graphql_1.Args)('taskId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "addTaskAssignee", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_type_1.TaskType),
    __param(0, (0, graphql_1.Args)('taskId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "removeTaskAssignee", null);
exports.TasksResolver = TasksResolver = __decorate([
    (0, graphql_1.Resolver)(() => task_type_1.TaskType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksResolver);
//# sourceMappingURL=tasks.resolver.js.map