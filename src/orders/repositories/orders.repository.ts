// src/orders/orders.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>,
    ) { }

    /**
     * Lista todos os pedidos.
     * @returns Lista de pedidos com seus produtos e quantidades.
     */
    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['orderProducts', 'orderProducts.product'],
        });
    }

    /**
     * Salva um novo pedido no banco de dados.
     * @param order Pedido a ser salvo.
     * @returns O pedido salvo.
     */
    async save(order: Order): Promise<Order> {
        return this.orderRepository.save(order);
    }

    /**
     * Salva uma associação entre pedido e produto.
     * @param orderProduct Associação a ser salva.
     * @returns A associação salva.
     */
    async saveOrderProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
        return this.orderProductRepository.save(orderProduct);
    }
}