// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from '../orders/controllers/orders.controller';
import { OrdersService } from '../orders/services/orders.service';
import { OrdersRepository } from '../orders/repositories/orders.repository';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { Product } from '../products/entities/product.entity';
import { ProductsRepository } from '../products/repositories/products.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderProduct, Product]), // Registra as entidades no TypeORM
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository, ProductsRepository], // Fornece o OrdersService e OrdersRepository
})
export class OrdersModule { }