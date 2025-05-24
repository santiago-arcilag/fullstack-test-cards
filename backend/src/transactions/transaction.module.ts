import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { WompiService } from './wompi.service';

@Module({
  imports: [PrismaModule],
  providers: [TransactionService, WompiService],
  controllers: [TransactionController],
})
export class TransactionModule {} 