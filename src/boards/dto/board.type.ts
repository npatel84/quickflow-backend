import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserType } from '../../users/dto/user.type';
import { BoardColumnType } from './board-column.type';

@ObjectType()
export class BoardType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => UserType)
  owner: UserType;

  @Field(() => String)
  ownerId: string;

  @Field(() => [UserType])
  members: UserType[];

  @Field(() => [BoardColumnType])
  columns: BoardColumnType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 