import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Store from './Store';
import ProductDetail from './ProductDetail';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Store />} />
        <Route path="/tienda/:slug" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
