// import Header from "./Header";
import Product from './Features/Product';
import ProductDetail from './Features/Product/components/ProductDetail';
import Header from './Header';

import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import ModalCart from './components/ModalCart';
import DetailCart from './Features/DetailCart';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<DetailCart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
