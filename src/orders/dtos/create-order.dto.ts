import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({
        description: 'Lista de IDs dos produtos no pedido',
        example: [1, 2],
        type: [Number],
    })
    produtos: number[];

    @ApiProperty({
        description: 'Status do pedido',
        example: 'Pendente',
        enum: ['Pendente', 'Concluído', 'Cancelado'],
    })
    status: string;
}