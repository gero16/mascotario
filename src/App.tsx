import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Store from './Store';
import ProductDetail from './ProductDetail';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';
import { CartProvider } from './CartContext';
import Checkout from './Checkout';
import ControlPanel from './ControlPanel';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Store />} />
        <Route path="/tienda/:slug" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/panel" element={<ControlPanel />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
