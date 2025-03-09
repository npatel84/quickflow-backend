import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class AttachmentType {
  @Field(() => ID)
  id: string;

  @Field()
  filename: string;

  @Field()
  path: string;

  @Field()
  mimeType: string;

  @Field(() => Int)
  size: number;

  @Field(() => String)
  taskId: string;

  @Field()
  createdAt: Date;
} 