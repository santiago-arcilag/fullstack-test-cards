import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new InternalServerErrorException('Product not found');

    const customer = await this.prisma.customer.upsert({
      where: { email: dto.customerEmail },
      update: { name: dto.customerName },
      create: { email: dto.customerEmail, name: dto.customerName },
    });

    const transaction = await this.prisma.transaction.create({
      data: {
        productId: dto.productId,
        customerId: customer.id,
        amount: product.price,
        status: 'PENDING',
      },
    });

    try {
      // simulate external payment delay
      await new Promise((res) => setTimeout(res, 500));
      return this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'SUCCESS' },
      });
    } catch {
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'FAILED' },
      });
      throw new InternalServerErrorException('Payment failed');
    }
  }
} 