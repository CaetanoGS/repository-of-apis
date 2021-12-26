import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        await this.authService.signUp(createUserDto);
        return {
            message: 'User registered',
        };
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<{ token: string }> {
        return await this.authService.signIn(credentiaslsDto);
    }
}