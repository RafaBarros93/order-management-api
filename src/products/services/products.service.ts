// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async findAll(): Promise<Product[]> {
        return this.productsRepository.findAll();
    }

    async findOne(id: number): Promise<Product | null> {
        return this.productsRepository.findOne(id);
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productsRepository.create(createProductDto);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
        return this.productsRepository.update(id, updateProductDto);
    }

    async delete(id: number): Promise<void> {
        return this.productsRepository.delete(id);
    }
}