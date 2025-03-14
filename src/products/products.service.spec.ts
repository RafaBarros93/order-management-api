import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/services/products.service';
import { ProductsRepository } from '../products/repositories/products.repository';
import { CreateProductDto } from '../products/dtos/create-product.dto';
import { UpdateProductDto } from '../products/dtos/update-product.dto';

describe('ProductsService', () => {
    let service: ProductsService;
    let productsRepository: ProductsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsRepository,
                    useValue: {
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        productsRepository = module.get<ProductsRepository>(ProductsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const mockProducts = [
                {
                    id: 1,
                    nome: 'Notebook',
                    categoria: 'Eletrônicos',
                    descricao: 'Notebook de última geração',
                    preco: 4500,
                    quantidade_estoque: 10,
                },
            ];
            jest.spyOn(productsRepository, 'findAll').mockResolvedValue(mockProducts);

            const result = await service.findAll();
            expect(result).toEqual(mockProducts);
            expect(productsRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a product by ID', async () => {
            const mockProduct = {
                id: 1,
                nome: 'Notebook',
                categoria: 'Eletrônicos',
                descricao: 'Notebook de última geração',
                preco: 4500,
                quantidade_estoque: 10,
            };
            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);

            const result = await service.findOne(1);
            expect(result).toEqual(mockProduct);
            expect(productsRepository.findOne).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if product is not found', async () => {
            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(null);

            await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const createProductDto: CreateProductDto = {
                nome: 'Notebook',
                categoria: 'Eletrônicos',
                descricao: 'Notebook de última geração',
                preco: 4500,
                quantidade_estoque: 10,
            };

            const mockProduct = {
                id: 1,
                ...createProductDto,
            };

            jest.spyOn(productsRepository, 'create').mockResolvedValue(mockProduct);

            const result = await service.create(createProductDto);
            expect(result).toEqual(mockProduct);
            expect(productsRepository.create).toHaveBeenCalledWith(createProductDto);
        });
    });

    describe('update', () => {
        it('should update an existing product', async () => {
            const updateProductDto: UpdateProductDto = {
                nome: 'Notebook Atualizado',
                preco: 5000,
            };

            const existingProduct = {
                id: 1,
                nome: 'Notebook',
                categoria: 'Eletrônicos',
                descricao: 'Notebook de última geração',
                preco: 4500,
                quantidade_estoque: 10,
            };

            const updatedProduct = {
                ...existingProduct,
                ...updateProductDto,
            };

            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(existingProduct);
            jest.spyOn(productsRepository, 'update').mockResolvedValue(undefined);
            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(updatedProduct);

            const result = await service.update(1, updateProductDto);
            expect(result).toEqual(updatedProduct);
            expect(productsRepository.findOne).toHaveBeenCalledWith(1);
            expect(productsRepository.update).toHaveBeenCalledWith(1, updateProductDto);
            expect(productsRepository.findOne).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if product is not found', async () => {
            const updateProductDto: UpdateProductDto = {
                nome: 'Notebook Atualizado',
                preco: 5000,
            };

            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(null);

            await expect(service.update(1, updateProductDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete a product', async () => {
            const existingProduct = {
                id: 1,
                nome: 'Notebook',
                categoria: 'Eletrônicos',
                descricao: 'Notebook de última geração',
                preco: 4500,
                quantidade_estoque: 10,
            };

            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(existingProduct);
            jest.spyOn(productsRepository, 'delete').mockResolvedValue(undefined);

            await service.delete(1);
            expect(productsRepository.findOne).toHaveBeenCalledWith(1);
            expect(productsRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if product is not found', async () => {
            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(null);

            await expect(service.delete(1)).rejects.toThrow(NotFoundException);
        });
    });
});