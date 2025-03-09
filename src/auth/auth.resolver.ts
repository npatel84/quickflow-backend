import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenResponseDto } from './dto/token-response.dto';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenResponseDto)
  async login(@Args('input') loginInput: LoginInput): Promise<TokenResponseDto> {
    return this.authService.login(loginInput.email, loginInput.password);
  }

  @Mutation(() => TokenResponseDto)
  async register(@Args('input') createUserInput: CreateUserInput): Promise<TokenResponseDto> {
    return this.authService.register(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TokenResponseDto)
  async refreshToken(@CurrentUser() user: User): Promise<TokenResponseDto> {
    return this.authService.refreshToken(user.id);
  }
} 