import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto);
  }

  @Post('pay')
  payWithCard(@Body() dto: CreateTransactionDto) {
    return this.service.payWithCard(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
} 