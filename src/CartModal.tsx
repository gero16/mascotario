import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import type { CartItem, CartContextType } from './CartContext';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CartModal({ open, onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart() as CartContextType;
  const navigate = useNavigate();

  if (!open) return null;

  const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <div className="modal-overlay-custom">
      <div className="modal-cart-custom">
        <button onClick={onClose} className="modal-cart-close">&times;</button>
        <h2 className="modal-cart-title">Carrito de compras</h2>
        {items.length === 0 ? (
          <p className="modal-cart-empty">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="modal-cart-list">
              {items.map((item: CartItem) => (
                <li key={item.id} className="modal-cart-item">
                  <div className="modal-cart-item-row">
                    {item.image && <img src={item.image} alt="" className="modal-cart-item-img" />}
                    <span className="modal-cart-item-name">{item.name}</span>
                    <button className="modal-cart-qty-btn" onClick={()=>updateQuantity(item.id,item.quantity-1)} disabled={item.quantity===1}>-</button>
                    <span className="modal-cart-qty">{item.quantity}</span>
                    <button className="modal-cart-qty-btn" onClick={()=>updateQuantity(item.id,item.quantity+1)}>+</button>
                    <span className="modal-cart-item-price">${item.price * item.quantity}</span>
                    <button className="modal-cart-del-btn" onClick={()=>removeFromCart(item.id)} aria-label="Eliminar">🗑</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="modal-cart-total-row">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <button className="modal-cart-btn" onClick={clearCart}>Vaciar carrito</button>
            <button className="modal-cart-btn modal-cart-btn-pay" onClick={()=>{ onClose(); navigate('/checkout'); }}>Ir a pagar</button>
          </>
        )}
      </div>
    </div>
  );
}
