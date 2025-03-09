import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserType } from '../../users/dto/user.type';
import { CommentType } from '../../comments/dto/comment.type';
import { AttachmentType } from './attachment.type';

@ObjectType()
export class TaskType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  priority: string;

  @Field(() => String)
  columnId: string;

  @Field(() => UserType)
  creator: UserType;

  @Field(() => String)
  creatorId: string;

  @Field(() => [UserType])
  assignees: UserType[];

  @Field({ nullable: true })
  dueDate?: Date;

  @Field(() => [CommentType])
  comments: CommentType[];

  @Field(() => [AttachmentType])
  attachments: AttachmentType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 