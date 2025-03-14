// src/orders/dto/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
    @ApiProperty({ description: 'ID do produto', example: 1 })
    productId: number;

    @ApiProperty({ description: 'Quantidade do produto', example: 2 })
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({
        description: 'Lista de produtos no pedido',
        type: [CreateOrderItemDto],
        example: [{ productId: 1, quantity: 2 }],
    })
    produtos: CreateOrderItemDto[];

    @ApiProperty({
        description: 'Status do pedido',
        example: 'Pendente',
        enum: ['Pendente', 'Concluído', 'Cancelado'],
    })
    status: string;
}