import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import './Navbar.css';

const LOGO_URL = 'https://res.cloudinary.com/geronicola/image/upload/v1764862490/mascotario/s4hodexxgwckorkdu75f.png';

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { items } = useCart();
  const itemsCount = items.reduce((a: number, b) => a + b.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <img src={LOGO_URL} alt="Mascotario Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/tienda">Tienda</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/panel">Panel</Link>
          <button 
            className="navbar-cart-btn"
            onClick={()=>setModalOpen(true)} 
            aria-label="Abrir carrito"
          >
            <span role="img" aria-label="carrito" className="navbar-cart-emoji">🛒</span>
            {itemsCount > 0 && <span className="navbar-cart-badge">{itemsCount}</span>}
          </button>
        </div>
      </div>
      <CartModal open={modalOpen} onClose={()=>setModalOpen(false)} />
    </nav>
  );
}
