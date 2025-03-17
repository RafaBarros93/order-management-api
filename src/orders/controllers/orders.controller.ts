// src/orders/orders.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth('access-token') // Adiciona Bearer Token no Swagger
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todos os pedidos' })
    @ApiResponse({ status: 200, description: 'Pedidos listados com sucesso' })
    async findAll() {
        return this.ordersService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo pedido' })
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
    @ApiResponse({ status: 401, description: 'Id do pedido não encontrado' })
    async create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
}