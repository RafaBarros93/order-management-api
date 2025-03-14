import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    categoria: string;

    @Column()
    descricao: string;

    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;

    @Column()
    quantidade_estoque: number;
}
