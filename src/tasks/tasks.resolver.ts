import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskType } from './dto/task.type';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Resolver(() => TaskType)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [TaskType])
  async tasks(@CurrentUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Query(() => TaskType)
  async task(@Args('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.findOne(id, user.id);
  }

  @Mutation(() => TaskType)
  async createTask(
    @Args('input') createTaskInput: CreateTaskInput,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.create(createTaskInput, user.id);
  }

  @Mutation(() => TaskType)
  async updateTask(
    @Args('input') updateTaskInput: UpdateTaskInput,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.update(updateTaskInput, user.id);
  }

  @Mutation(() => TaskType)
  async deleteTask(@Args('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.delete(id, user.id);
  }

  @Mutation(() => TaskType)
  async addTaskAssignee(
    @Args('taskId') taskId: string,
    @Args('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.addAssignee(taskId, userId, user.id);
  }

  @Mutation(() => TaskType)
  async removeTaskAssignee(
    @Args('taskId') taskId: string,
    @Args('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.removeAssignee(taskId, userId, user.id);
  }
} 