import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

export function ResultPage() {
  const checkout = useSelector((s: RootState) => (s as any).checkout);
  return (
    <div>
      <h2>Payment Complete!</h2>
      <p>Thank you, {checkout.customerName}. Your order is on its way.</p>
      <Link to="/">Back to products</Link>
    </div>
  );
} 