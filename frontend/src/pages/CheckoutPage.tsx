import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct, setCardInfo, setCustomerInfo } from '../features/checkoutSlice';
import { useState } from 'react';

export function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <form onSubmit={onSubmit}>
      <h2>Delivery & Card Info</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={onChange}
        required
      />
      <input name="number" placeholder="Card Number" value={form.number} onChange={onChange} required />
      <input name="expMonth" placeholder="Exp MM" value={form.expMonth} onChange={onChange} required />
      <input name="expYear" placeholder="Exp YY" value={form.expYear} onChange={onChange} required />
      <input name="cvc" placeholder="CVC" value={form.cvc} onChange={onChange} required />
      <button type="submit">Review Order</button>
    </form>
  );
} 