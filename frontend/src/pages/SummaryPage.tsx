import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { usePayTransactionMutation } from '../api';

export function SummaryPage() {
  const checkout = useSelector((s: RootState) => (s as any).checkout);
  const navigate = useNavigate();
  const [payTransaction, { isLoading }] = usePayTransactionMutation();

  // Dummy product info (replace with real product lookup if available in state)
  const product = checkout.product || { name: 'Product', price: checkout.amount || 0 };

  const handlePay = async () => {
    await payTransaction({
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

  const handleBack = () => navigate(-1);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Summary</h2>
      <div className="mb-4">
        <div className="mb-2">
          <span className="font-semibold">Product:</span> {product.name || 'Selected Product'}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Price:</span> ${product.price || checkout.amount || 'N/A'}
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2">
          <span className="font-semibold">Name:</span> {checkout.customerName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email:</span> {checkout.customerEmail}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Address:</span> {checkout.address}
        </div>
      </div>
      <div className="mb-6">
        <div className="mb-2">
          <span className="font-semibold">Card:</span> **** **** **** {checkout.card?.number?.slice(-4) || 'N/A'}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Exp:</span> {checkout.card?.expMonth}/{checkout.card?.expYear}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
        <button onClick={handlePay} disabled={isLoading} className="bg-green-600 text-white px-4 py-2 rounded">
          {isLoading ? 'Processing...' : 'Confirm & Pay'}
        </button>
      </div>
    </div>
  );
} 