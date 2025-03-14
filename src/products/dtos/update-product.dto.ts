import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({
        description: 'Nome do produto',
        example: 'Notebook Atualizado',
        required: false, // Campo opcional
    })
    nome?: string;

    @ApiProperty({
        description: 'Categoria do produto',
        example: 'Eletrônicos',
        required: false, // Campo opcional
    })
    categoria?: string;

    @ApiProperty({
        description: 'Descrição do produto',
        example: 'Notebook de última geração com upgrades',
        required: false, // Campo opcional
    })
    descricao?: string;

    @ApiProperty({
        description: 'Preço do produto',
        example: 5000.0,
        required: false, // Campo opcional
    })
    preco?: number;

    @ApiProperty({
        description: 'Quantidade em estoque',
        example: 15,
        required: false, // Campo opcional
    })
    quantidade_estoque?: number;
}