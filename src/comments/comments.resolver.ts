import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentType } from './dto/comment.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Resolver(() => CommentType)
@UseGuards(JwtAuthGuard)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [CommentType])
  async comments(@Args('taskId') taskId: string) {
    return this.commentsService.findAll(taskId);
  }

  @Mutation(() => CommentType)
  async createComment(
    @Args('content') content: string,
    @Args('taskId') taskId: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.create(content, taskId, user.id);
  }

  @Mutation(() => CommentType)
  async deleteComment(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.delete(id, user.id);
  }
} 