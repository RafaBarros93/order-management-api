
import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { ProductsRepository } from '../../products/repositories/products.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderProduct } from '../entities/order-product.entity';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productRepository: ProductsRepository,
    ) { }

    /**
     * Lista todos os pedidos.
     * @returns Lista de pedidos com seus produtos e quantidades.
     */
    async findAll(): Promise<Order[]> {
        return this.ordersRepository.findAll();
    }

    /**
     * Cria um novo pedido.
     * @param createOrderDto DTO com os dados do pedido.
     * @returns O pedido criado.
     */
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const { produtos, status } = createOrderDto;

        // Verifica se o status é válido
        const validStatuses = ['Pendente', 'Concluído', 'Cancelado'];
        if (!validStatuses.includes(status)) {
            throw new BadRequestException(`Status inválido: ${status}`);
        }

        // Verifica se os produtos existem e têm estoque suficiente
        const products = await Promise.all(
            produtos.map(async (item) => {
                const product = await this.productRepository.findOne(item.productId);

                if (!product) {
                    throw new BadRequestException(
                        `Produto com ID ${item.productId} não encontrado.`,
                    );
                }
                if (product.quantidade_estoque < item.quantity) {
                    throw new BadRequestException(
                        `Estoque insuficiente para o produto ${product.nome}.`,
                    );
                }
                return { product, quantity: item.quantity };
            }),
        );

        // Calcula o total do pedido
        const total_pedido = products.reduce((total, item) => {
            return total + item.product.preco * item.quantity;
        }, 0);

        // Cria o pedido
        const order = new Order();
        order.total_pedido = total_pedido;
        order.status = status;
        const savedOrder = await this.ordersRepository.save(order);

        // Associa os produtos ao pedido
        for (const item of products) {
            const orderProduct = new OrderProduct();
            orderProduct.order = savedOrder;
            orderProduct.product = item.product;
            orderProduct.quantity = item.quantity;
            await this.ordersRepository.saveOrderProduct(orderProduct);

            // Atualiza o estoque do produto se o status for "Concluído"
            if (status === 'Concluído') {
                item.product.quantidade_estoque -= item.quantity;
                await this.productRepository.update(item.product.id, { quantidade_estoque: item.product.quantidade_estoque });
            }
        }

        return savedOrder;
    }
}