import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserType } from '../../users/dto/user.type';

@ObjectType()
export class CommentType {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => String)
  taskId: string;

  @Field(() => UserType)
  author: UserType;

  @Field(() => String)
  authorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 