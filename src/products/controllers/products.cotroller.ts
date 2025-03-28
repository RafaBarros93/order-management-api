import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiTags('Products')
@ApiBearerAuth('access-token')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todos os produtos' })
    @ApiResponse({ status: 200, description: 'Produtos listados com sucesso' })
    async findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um produto por ID' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    @ApiResponse({ status: 200, description: 'Produto encontrado' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo produto' })
    @ApiBody({ type: CreateProductDto })
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