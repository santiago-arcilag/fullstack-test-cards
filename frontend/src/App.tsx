import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsList } from './components/ProductsList';
import { CheckoutPage } from './pages/CheckoutPage';
import { SummaryPage } from './pages/SummaryPage';
import { ResultPage } from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
