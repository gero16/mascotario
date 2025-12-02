import React from 'react';
import './Checkout.css';
import { useCart } from './CartContext';

export default function Checkout() {
  const { items } = useCart();

  // Calcula el total visualmente
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
