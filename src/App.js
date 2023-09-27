// import Header from "./Header";
import Product from './Features/Product';
import ProductDetail from './Features/Product/components/ProductDetail';
import Header from './Header';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
