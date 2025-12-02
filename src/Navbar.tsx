import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from './CartContext';
import CartModal from './CartModal';

const LOGO_URL = 'https://res.cloudinary.com/geronicola/image/upload/v1764624562/mascotario/macgscolzsr8wbmxvtqt.png';

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { items } = useCart();
  const itemsCount = items.reduce((a, b) => a + b.quantity, 0);

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
          <button 
            style={{marginLeft:16,cursor:'pointer',background:'none',border:'none',position:'relative'}} 
            onClick={()=>setModalOpen(true)} 
            aria-label="Abrir carrito"
          >
            <span role="img" aria-label="carrito" style={{fontSize:24}}>🛒</span>
            {itemsCount > 0 && <span style={{position:'absolute',top:-6,right:-6,background:'#ff5722',color:'#fff',borderRadius:'50%',padding:'0 6px',fontSize:12}}>{itemsCount}</span>}
          </button>
        </div>
      </div>
      <CartModal open={modalOpen} onClose={()=>setModalOpen(false)} />
    </nav>
  );
}
