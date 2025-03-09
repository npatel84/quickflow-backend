import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsDateString, IsEnum } from 'class-validator';
import { TaskPriority } from '@prisma/client';

@InputType()
export class UpdateTaskInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  columnId?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  assigneeIds?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
} 