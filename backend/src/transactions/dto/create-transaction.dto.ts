export class CreateTransactionDto {
  productId: number;
  customerEmail: string;
  customerName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  address: string;
} 