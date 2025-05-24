import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WompiService {
  private readonly wompiUrl = process.env.WOMPI_API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';
  private readonly publicKey = process.env.WOMPI_PUBLIC_KEY;
  private readonly privateKey = process.env.WOMPI_PRIVATE_KEY;
  private readonly integrity = process.env.WOMPI_INTEGRITY_SECRET;

  async payWithCard({ amountInCents, currency, reference, card, customerEmail, customerName }: {
    amountInCents: number;
    currency: string;
    reference: string;
    card: {
      number: string;
      expMonth: string;
      expYear: string;
      cvc: string;
    };
    customerEmail: string;
    customerName: string;
  }) {
    try {
      // 1. Get acceptance token
      const acceptanceRes = await axios.get<any>(`${this.wompiUrl}/merchants/${this.publicKey}`);
      const acceptanceToken = acceptanceRes.data.data.presigned_acceptance.acceptance_token;

      // 2. Create payment source (tokenize card)
      const sourceRes = await axios.post(`${this.wompiUrl}/payment_sources`, {
        type: 'CARD',
        token: null, // You must implement card tokenization if required
        customer_email: customerEmail,
      });
      // For the test, you may skip tokenization and use test tokens if available

      // 3. Create transaction
      const txRes = await axios.post(`${this.wompiUrl}/transactions`, {
        amount_in_cents: amountInCents,
        currency,
        customer_email: customerEmail,
        payment_method: {
          type: 'CARD',
          // ...card token or details
        },
        reference,
        acceptance_token: acceptanceToken,
      });
      return txRes.data;
    } catch (err) {
      throw new InternalServerErrorException('Error processing payment with Wompi', err.message);
    }
  }
} 