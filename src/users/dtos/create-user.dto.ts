import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({
        message: 'Email is required',
    })
    @IsEmail(
        {},
        {
            message: 'Email invalid',
        },
    )
    @MaxLength(200, {
        message: 'The emails length is invalid, the max is 200 characters',
    })
    email: string;

    @IsNotEmpty({
        message: 'Name is required',
    })
    @MaxLength(200, {
        message: 'The emails length is invalid, the max is 200 characters',
    })
    name: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    @MinLength(6, {
        message: 'The min number of characters is 6',
    })
    password: string;

    @IsNotEmpty({
        message: 'Password confirmation is required',
    })
    @MinLength(6, {
        message: 'The min number of characters is 6',
    })
    passwordConfirmation: string;
}