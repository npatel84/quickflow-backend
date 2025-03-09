import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

@InputType()
export class CreateColumnInput {
  @Field()
  @IsNotEmpty({ message: 'Column name is required' })
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  order: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  boardId: string;
} 