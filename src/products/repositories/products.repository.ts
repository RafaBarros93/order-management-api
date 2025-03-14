import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOne({ where: { id } });
    }

    async create(product: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }

    async update(id: number, product: UpdateProductDto): Promise<void> {
        await this.productRepository.update(id, product);
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
