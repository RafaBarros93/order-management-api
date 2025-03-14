import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne(id);
        if (!product) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productsRepository.create(createProductDto);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const existingProduct = await this.productsRepository.findOne(id);
        if (!existingProduct) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }

        await this.productsRepository.update(id, updateProductDto);
        return this.productsRepository.findOne(id) as Promise<Product>;
    }

    async delete(id: number): Promise<void> {
        const existingProduct = await this.productsRepository.findOne(id);
        if (!existingProduct) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        await this.productsRepository.delete(id);
    }
}
