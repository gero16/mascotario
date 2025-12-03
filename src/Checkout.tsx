import './Checkout.css';
import { useCart } from './CartContext';
import { useState } from 'react';

export default function Checkout() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  // Calcula el total visualmente
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const pagarConMercadoPago = async () => {
    setLoading(true);
    setError(null);
    try {
      const productos = items.map(item => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      }));
      const response = await fetch('http://localhost:3000/pago/preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productos })
      });
      if (!response.ok) throw new Error("No se pudo generar la preferencia");
      const data = await response.json();
      if (!data.init_point) throw new Error("No se obtuvo link de pago");
      window.location.href = data.init_point;
    } catch (e:any) {
      setError(e.message || "Error procesando el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-padding">
      <h1>Checkout</h1>
      <div className="checkout-columns">
        {/* Formulario de datos del cliente */}
        <section className="checkout-section checkout-cliente">
          <h2>Datos del Cliente</h2>
          <form className="checkout-form" autoComplete="off">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Nombre completo" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" placeholder="Ej: 123456789" />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" placeholder="Calle, número, ciudad" />
            </div>
          </form>
        </section>

        {/* Resumen de compra */}
        <section className="checkout-section checkout-resumen">
          <h2>Resumen de Compra</h2>
          {items.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <div className="checkout-summary">
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="checkout-product">
                    <div>
                      <strong>{item.name}</strong> x {item.quantity}
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="checkout-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="checkout-mercadopago-btn"
                onClick={pagarConMercadoPago}
                disabled={loading || items.length === 0}
                style={{marginTop:20,padding:'10px 20px',fontSize:18,fontWeight:'bold',background:'#009ee3',color:'white',border:'none',borderRadius:8,cursor:'pointer'}}
              >
                {loading ? "Redirigiendo..." : "Pagar con Mercado Pago"}
              </button>
              {error && (
                <div style={{color:'red',marginTop:10}}>{error}</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
