import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './enums/user-roles.enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const {email, name, password} = createUserDto;

        const user = this.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt)

        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        }catch (e) {
            if (e.code.toString() == '23505')
                throw new ConflictException('Duplicated e-mail');
            else
                throw new InternalServerErrorException('Error to save user in the DB');
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}