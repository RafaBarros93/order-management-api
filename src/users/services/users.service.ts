import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await this.findOne(username);

        if (userExists)
            throw new ConflictException(`Usuário Já Cadastrado.`);

        return this.usersRepository.create(username, hashedPassword);
    }

    async findOne(username: string): Promise<User | undefined | null> {
        return this.usersRepository.findOne(username);
    }


}