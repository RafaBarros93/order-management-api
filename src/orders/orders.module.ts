// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { Order } from './entities/order.entity';
import { ProductsModule } from '../products/products.module'; // Importa o ProductsModule
import { Product } from '../products/entities/product.entity'; // Importa a entidade Product

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, Product]), // Registra as entidades Order e Product no TypeORM
        ProductsModule, // Importa o ProductsModule para usar o ProductsService
    ],
    controllers: [OrdersController], // Controlador de pedidos
    providers: [OrdersService, OrdersRepository], // Serviço e repositório de pedidos
})
export class OrdersModule { }