// src/products/products.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './repositories/products.repository';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
    let service: ProductsService;
    let repository: ProductsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsRepository,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([new Product()]),
                        findOne: jest.fn().mockResolvedValue(new Product()),
                        create: jest.fn().mockResolvedValue(new Product()),
                        update: jest.fn().mockResolvedValue(new Product()),
                        delete: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        repository = module.get<ProductsRepository>(ProductsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an array of products', async () => {
        const result = await service.findAll();
        expect(result).toBeInstanceOf(Array);
        expect(repository.findAll).toHaveBeenCalled();
    });

    it('should return a single product', async () => {
        const result = await service.findOne(1);
        expect(result).toBeInstanceOf(Product);
        expect(repository.findOne).toHaveBeenCalledWith(1);
    });
});