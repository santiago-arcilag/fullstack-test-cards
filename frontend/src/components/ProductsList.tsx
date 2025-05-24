import { useGetProductsQuery } from '../api';

export function ProductsList() {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <ul>
      {products?.map((p: any) => (
        <li key={p.id}>
          <strong>{p.name}</strong> — ${p.price} ({p.stock} in stock)
        </li>
      ))}
    </ul>
  );
} 