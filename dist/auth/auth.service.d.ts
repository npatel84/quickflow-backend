import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '@prisma/client';
import { TokenResponseDto } from './dto/token-response.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(email: string, password: string): Promise<TokenResponseDto>;
    register(createUserInput: CreateUserInput): Promise<TokenResponseDto>;
    refreshToken(userId: string): Promise<TokenResponseDto>;
    private generateToken;
}
