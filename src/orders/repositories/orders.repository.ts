// src/orders/orders.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['produtos'] });
    }

    async findOne(id: number): Promise<Order | null> {
        return this.orderRepository.findOne({ where: { id }, relations: ['produtos'] });
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const produtos = await this.productRepository.findByIds(createOrderDto.produtos);
        const total_pedido = produtos.reduce((acc, product) => acc + product.preco, 0);
        const newOrder = this.orderRepository.create({ produtos, total_pedido, status: createOrderDto.status });
        return this.orderRepository.save(newOrder);
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        await this.orderRepository.update(id, updateOrderDto);
        return this.orderRepository.findOne({ where: { id }, relations: ['produtos'] });
    }
}