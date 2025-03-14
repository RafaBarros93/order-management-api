import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('products') // Tag para agrupar endpoints relacionados a produtos
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todos os produtos' }) // Descrição da operação
    @ApiResponse({ status: 200, description: 'Produtos listados com sucesso' }) // Resposta esperada
    async findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um produto por ID' })
    @ApiParam({ name: 'id', description: 'ID do produto' }) // Parâmetro da rota
    @ApiResponse({ status: 200, description: 'Produto encontrado' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo produto' })
    @ApiBody({ type: CreateProductDto }) // Tipo do corpo da requisição
    @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um produto' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    @ApiResponse({ status: 204, description: 'Produto deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    async delete(@Param('id') id: string) {
        return this.productsService.delete(+id);
    }
}