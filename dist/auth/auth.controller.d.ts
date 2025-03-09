import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.input';
import { TokenResponseDto } from './dto/token-response.dto';
import { User } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<TokenResponseDto>;
    register(createUserInput: CreateUserInput): Promise<TokenResponseDto>;
    me(user: User): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    refreshToken(user: User): Promise<TokenResponseDto>;
}
