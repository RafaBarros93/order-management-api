import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    @ApiOperation({ summary: 'Cadastrar um novo usuário' }) // Descrição da operação
    @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' }) // Resposta esperada
    @ApiResponse({ status: 400, description: 'Dados inválidos' }) // Resposta de erro
    @ApiResponse({ status: 409, description: 'Usuário Já Cadastrado.' }) // Resposta de erro
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}