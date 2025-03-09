import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { TaskType } from '../../tasks/dto/task.type';

@ObjectType()
export class BoardColumnType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  order: number;

  @Field(() => String)
  boardId: string;

  @Field(() => [TaskType])
  tasks: TaskType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 