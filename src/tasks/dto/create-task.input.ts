import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsDateString, IsEnum } from 'class-validator';
import { TaskPriority } from '@prisma/client';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty({ message: 'Task title is required' })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { defaultValue: TaskPriority.MEDIUM })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @Field()
  @IsNotEmpty()
  @IsString()
  columnId: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  assigneeIds?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
} 