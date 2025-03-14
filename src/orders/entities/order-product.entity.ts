// src/orders/entities/order-product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number; // Quantidade do produto no pedido
}