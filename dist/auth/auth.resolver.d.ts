import { AuthService } from './auth.service';
import { TokenResponseDto } from './dto/token-response.dto';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { User } from '@prisma/client';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<TokenResponseDto>;
    register(createUserInput: CreateUserInput): Promise<TokenResponseDto>;
    refreshToken(user: User): Promise<TokenResponseDto>;
}
