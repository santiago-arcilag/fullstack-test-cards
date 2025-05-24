import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsList } from './components/ProductsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
