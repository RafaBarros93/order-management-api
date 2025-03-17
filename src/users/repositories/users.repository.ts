import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async create(username: string, password: string): Promise<User> {
        const user = this.repository.create({ username, password });
        return this.repository.save(user);
    }

    async findOne(username: string): Promise<User | undefined | null> {
        return this.repository.findOne({ where: { username } });
    }


}