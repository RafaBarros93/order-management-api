// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) { }

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.findAll();
    }

    async findOne(id: number): Promise<Order | null> {
        return this.ordersRepository.findOne(id);
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersRepository.create(createOrderDto);
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        return this.ordersRepository.update(id, updateOrderDto);
    }
}