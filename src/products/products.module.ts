// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.cotroller';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './repositories/products.repository';
import { Product } from './entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product])], // Registra a entidade Product no TypeORM
    controllers: [ProductsController], // Controlador de produtos
    providers: [ProductsService, ProductsRepository], // Serviço e repositório de produtos
    exports: [ProductsService], // Exporta o serviço para uso em outros módulos (opcional)
})
export class ProductsModule { }