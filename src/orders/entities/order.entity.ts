// src/orders/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Product)
    @JoinTable()
    produtos: Product[];

    @Column('decimal', { precision: 10, scale: 2 })
    total_pedido: number;

    @Column()
    status: string; // "Pendente", "Concluído" ou "Cancelado"
}