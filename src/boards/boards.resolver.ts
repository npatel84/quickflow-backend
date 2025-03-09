import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardType } from './dto/board.type';
import { BoardColumnType } from './dto/board-column.type';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { CreateColumnInput } from './dto/create-column.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Resolver(() => BoardType)
@UseGuards(JwtAuthGuard)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [BoardType])
  async boards(@CurrentUser() user: User) {
    return this.boardsService.findAll(user.id);
  }

  @Query(() => BoardType)
  async board(@Args('id') id: string, @CurrentUser() user: User) {
    return this.boardsService.findOne(id, user.id);
  }

  @Mutation(() => BoardType)
  async createBoard(
    @Args('input') createBoardInput: CreateBoardInput,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.create(createBoardInput, user.id);
  }

  @Mutation(() => BoardType)
  async updateBoard(
    @Args('input') updateBoardInput: UpdateBoardInput,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.update(updateBoardInput, user.id);
  }

  @Mutation(() => BoardType)
  async deleteBoard(@Args('id') id: string, @CurrentUser() user: User) {
    return this.boardsService.delete(id, user.id);
  }

  @Mutation(() => BoardType)
  async addBoardMember(
    @Args('boardId') boardId: string,
    @Args('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.addMember(boardId, userId, user.id);
  }

  @Mutation(() => BoardType)
  async removeBoardMember(
    @Args('boardId') boardId: string,
    @Args('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.removeMember(boardId, userId, user.id);
  }

  @Mutation(() => BoardColumnType)
  async createBoardColumn(
    @Args('input') createColumnInput: CreateColumnInput,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.createColumn(createColumnInput, user.id);
  }

  @Mutation(() => BoardColumnType)
  async updateBoardColumn(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name: string,
    @Args('order', { nullable: true }) order: number,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.updateColumn(id, name, order, user.id);
  }

  @Mutation(() => BoardColumnType)
  async deleteBoardColumn(@Args('id') id: string, @CurrentUser() user: User) {
    return this.boardsService.deleteColumn(id, user.id);
  }
} 