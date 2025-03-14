import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
    @ApiProperty({
        description: 'Novo status do pedido',
        example: 'Concluído',
        enum: ['Pendente', 'Concluído', 'Cancelado'],
        required: false, // Campo opcional
    })
    status?: string;
}