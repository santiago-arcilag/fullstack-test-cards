import { useGetProductsQuery } from '../api';
import { Link } from 'react-router-dom';

export function ProductsList() {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <ul>
      {products?.map((p: any) => (
        <li key={p.id}>
          <Link to={`/checkout/${p.id}`}>
            <strong>{p.name}</strong> — ${p.price} ({p.stock} in stock)
          </Link>
        </li>
      ))}
    </ul>
  );
} 