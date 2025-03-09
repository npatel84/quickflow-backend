import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field()
  @IsNotEmpty({ message: 'Board name is required' })
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  memberIds?: string[];
} 