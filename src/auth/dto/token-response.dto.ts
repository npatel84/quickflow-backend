import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@ObjectType()
export class UserDto {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => String)
  role: UserRole;
}

@ObjectType()
export class TokenResponseDto {
  @Field()
  accessToken: string;

  @Field(() => UserDto)
  user: UserDto;
} 