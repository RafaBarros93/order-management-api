import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('orders') // Tag para agrupar endpoints relacionados a pedidos
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todos os pedidos' })
    @ApiResponse({ status: 200, description: 'Pedidos listados com sucesso' })
    async findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um pedido por ID' })
    @ApiParam({ name: 'id', description: 'ID do pedido', type: Number })
    @ApiResponse({ status: 200, description: 'Pedido encontrado' })
    @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
    async findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo pedido' })
    @ApiBody({ type: CreateOrderDto }) // Tipo do corpo da requisição
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar o status de um pedido' })
    @ApiParam({ name: 'id', description: 'ID do pedido', type: Number })
    @ApiBody({ type: UpdateOrderDto }) // Tipo do corpo da requisição
    @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {
        return this.ordersService.update(+id, updateOrderDto);
    }
}