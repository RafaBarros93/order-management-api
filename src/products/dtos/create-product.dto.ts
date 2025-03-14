import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Nome do produto', example: 'Notebook' })
    nome: string;

    @ApiProperty({ description: 'Categoria do produto', example: 'Eletrônicos' })
    categoria: string;

    @ApiProperty({ description: 'Descrição do produto', example: 'Notebook de última geração' })
    descricao: string;

    @ApiProperty({ description: 'Preço do produto', example: 4500.0 })
    preco: number;

    @ApiProperty({ description: 'Quantidade em estoque', example: 10 })
    quantidade_estoque: number;
}