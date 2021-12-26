import {Body, Controller, Param, Post, Req, ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('admin')
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        const user = await this.userService.createAdminUser(createUserDto);
        return {user, message: 'Admin user created'}
    }

    @Post()
    async  createUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto>{
        const user = await this.userService.createUser(createUserDto)
        return {user, message: 'User created'}
    }
}

