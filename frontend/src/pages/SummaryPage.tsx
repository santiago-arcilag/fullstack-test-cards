import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useCreateTransactionMutation } from '../api';

export function SummaryPage() {
  const checkout = useSelector((s: RootState) => (s as any).checkout);
  const navigate = useNavigate();
  const [createTx, { isLoading }] = useCreateTransactionMutation();

  const handlePay = async () => {
    await createTx({
      productId: checkout.productId,
      customerEmail: checkout.customerEmail,
      customerName: checkout.customerName,
      address: checkout.address,
      cardNumber: checkout.card.number,
      expMonth: checkout.card.expMonth,
      expYear: checkout.card.expYear,
      cvc: checkout.card.cvc,
    }).unwrap();
    navigate('/result');
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <pre>{JSON.stringify(checkout, null, 2)}</pre>
      <button onClick={handlePay} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
    </div>
  );
} 