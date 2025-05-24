import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct, setCardInfo, setCustomerInfo } from '../features/checkoutSlice';
import { useState } from 'react';

export function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    dispatch(setProduct(Number(id)));
    dispatch(
      setCustomerInfo({
        name: form.name,
        email: form.email,
        address: form.address,
      }),
    );
    dispatch(
      setCardInfo({
        number: form.number,
        expMonth: form.expMonth,
        expYear: form.expYear,
        cvc: form.cvc,
      }),
    );
    navigate('/summary');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <form onSubmit={onSubmit}>
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Info</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <input name="email" placeholder="Email" value={form.email} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <input name="address" placeholder="Address" value={form.address} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <div className="flex justify-end">
              <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Card Info</h2>
            <input name="number" placeholder="Card Number" value={form.number} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <input name="expMonth" placeholder="Exp MM" value={form.expMonth} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <input name="expYear" placeholder="Exp YY" value={form.expYear} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <input name="cvc" placeholder="CVC" value={form.cvc} onChange={onChange} required className="block w-full mb-3 p-2 border rounded" />
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
              <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Review</h2>
            <div className="mb-4">
              <div><strong>Name:</strong> {form.name}</div>
              <div><strong>Email:</strong> {form.email}</div>
              <div><strong>Address:</strong> {form.address}</div>
              <div><strong>Card:</strong> **** **** **** {form.number.slice(-4)}</div>
              <div><strong>Exp:</strong> {form.expMonth}/{form.expYear}</div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Confirm & Continue</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 