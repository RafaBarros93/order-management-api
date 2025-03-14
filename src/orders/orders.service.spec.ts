// src/orders/orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrdersService } from '../orders/services/orders.service';
import { OrdersRepository } from '../orders/repositories/orders.repository';
import { ProductsRepository } from '../products/repositories/products.repository';
import { CreateOrderDto } from '../orders/dtos/create-order.dto';

describe('OrdersService', () => {
    let service: OrdersService;
    let ordersRepository: OrdersRepository;
    let productsRepository: ProductsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: OrdersRepository,
                    useValue: {
                        findAll: jest.fn(),
                        save: jest.fn(),
                        saveOrderProduct: jest.fn(),
                    },
                },
                {
                    provide: ProductsRepository,
                    useValue: {
                        findOne: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        ordersRepository = module.get<OrdersRepository>(OrdersRepository);
        productsRepository = module.get<ProductsRepository>(ProductsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of orders', async () => {
            const mockOrders = [
                {
                    id: 1,
                    total_pedido: 100,
                    status: 'Pendente',
                    produtos: [],
                    orderProducts: [],
                },
            ];
            jest.spyOn(ordersRepository, 'findAll').mockResolvedValue(mockOrders);

            const result = await service.findAll();
            expect(result).toEqual(mockOrders);
            expect(ordersRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('should create an order and update stock if status is "Concluído"', async () => {
            const createOrderDto: CreateOrderDto = {
                produtos: [{ productId: 1, quantity: 2 }],
                status: 'Concluído',
            };

            const mockProduct = {
                id: 1,
                nome: 'Notebook',
                categoria: 'Eletrônicos',
                descricao: 'Notebook de última geração',
                preco: 4500,
                quantidade_estoque: 10,
            };

            const mockOrder = {
                id: 1,
                total_pedido: 9000,
                status: 'Concluído',
                produtos: [],
                orderProducts: [],
            };

            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);
            jest.spyOn(ordersRepository, 'save').mockResolvedValue(mockOrder);
            jest.spyOn(productsRepository, 'update').mockResolvedValue({} as any);

            const result = await service.create(createOrderDto);

            expect(result).toEqual(mockOrder);
            expect(productsRepository.findOne).toHaveBeenCalledWith(1);
            expect(ordersRepository.save).toHaveBeenCalled();
            expect(productsRepository.update).toHaveBeenCalledWith(1, {
                quantidade_estoque: 8, // Estoque atualizado
            });
        });

        it('should throw BadRequestException if status is invalid', async () => {
            const createOrderDto: CreateOrderDto = {
                produtos: [{ productId: 1, quantity: 2 }],
                status: 'InvalidStatus',
            };

            await expect(service.create(createOrderDto)).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw BadRequestException if product is not found', async () => {
            const createOrderDto: CreateOrderDto = {
                produtos: [{ productId: 1, quantity: 2 }],
                status: 'Concluído',
            };

            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(null);

            await expect(service.create(createOrderDto)).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw BadRequestException if stock is insufficient', async () => {
            const createOrderDto: CreateOrderDto = {
                produtos: [{ productId: 1, quantity: 12 }],
                status: 'Concluído',
            };

            const mockProduct = {
                id: 1,
                nome: 'Notebook',
                categoria: 'Eletrônicos',
                descricao: 'Notebook de última geração',
                preco: 4500,
                quantidade_estoque: 10,
            };

            jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);

            await expect(service.create(createOrderDto)).rejects.toThrow(
                BadRequestException,
            );
        });
    });
});