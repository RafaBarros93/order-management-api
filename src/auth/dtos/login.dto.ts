import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'john', description: 'Nome de usuário' })
    username: string;

    @ApiProperty({ example: '1234', description: 'Senha do usuário' })
    password: string;
}