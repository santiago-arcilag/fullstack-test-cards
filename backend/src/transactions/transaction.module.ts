import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [PrismaModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {} 