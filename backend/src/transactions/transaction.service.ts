import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import axios from 'axios';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    // 1. Create pending transaction in DB
    const transaction = await this.prisma.transaction.create({
      data: {
        productId: dto.productId,
        amount: 0, // will update after product fetched
        status: 'PENDING',
        customer: {
          connectOrCreate: {
            where: { email: dto.customerEmail },
            create: { email: dto.customerEmail, name: dto.customerName },
          },
        },
      },
      include: { product: true },
    });

    // compute amount
    const amount = transaction.product.price;
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: { amount },
    });

    // 2. Call Wompi sandbox (simplified)
    try {
      // For brevity, we just simulate external call
      await new Promise((res) => setTimeout(res, 500));
      return await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'SUCCESS' },
      });
    } catch (e) {
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'FAILED' },
      });
      throw new InternalServerErrorException('Payment failed');
    }
  }
} 