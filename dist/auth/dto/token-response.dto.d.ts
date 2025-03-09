import { UserRole } from '@prisma/client';
export declare class UserDto {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}
export declare class TokenResponseDto {
    accessToken: string;
    user: UserDto;
}
