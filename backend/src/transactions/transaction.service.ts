import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { WompiService } from './wompi.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wompi: WompiService,
  ) {}

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

  async payWithCard(dto: CreateTransactionDto) {
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
      // Call Wompi API
      const wompiResult: any = await this.wompi.payWithCard({
        amountInCents: Math.round(product.price * 100),
        currency: 'COP',
        reference: `order_${transaction.id}_${Date.now()}`,
        card: {
          number: dto.cardNumber,
          expMonth: dto.expMonth,
          expYear: dto.expYear,
          cvc: dto.cvc,
        },
        customerEmail: dto.customerEmail,
        customerName: dto.customerName,
      });
      // Update transaction status
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: wompiResult.data.status || 'SUCCESS' },
      });
      // Optionally update stock here
      return wompiResult;
    } catch (err) {
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'FAILED' },
      });
      throw new InternalServerErrorException('Payment failed', err?.message);
    }
  }

  async findOne(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }
} 