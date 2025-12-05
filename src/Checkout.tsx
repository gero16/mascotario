import './Checkout.css';
import { useCart } from './CartContext';
import { useMemo, useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000';

interface CheckoutFormValues {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  notas: string;
}

const emptyForm: CheckoutFormValues = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  notas: '',
};

export default function Checkout() {
  const { items } = useCart();
  const [form, setForm] = useState<CheckoutFormValues>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(
    () => items.reduce((acc: number, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    if (!items.length) {
      setError('Tu carrito está vacío.');
      return false;
    }
    const requiredFields: Array<keyof CheckoutFormValues> = ['nombre', 'email', 'telefono', 'direccion', 'ciudad'];
    const faltantes = requiredFields.filter(field => !form[field]?.trim());
    if (faltantes.length) {
      setError('Necesitamos todos los datos del formulario para generar la orden.');
      return false;
    }
    return true;
  };

  const pagarConMercadoPago = async () => {
    if (!validarFormulario()) return;
    setLoading(true);
    setError(null);
    try {
      const orderPayload = {
        cliente: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        direccion: form.direccion.trim(),
        ciudad: form.ciudad.trim(),
        notas: form.notas?.trim() || undefined,
        canal: 'Web',
        items: items.map(item => ({
          productId: item.id,
          nombre: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
          image: item.image,
        })),
        total,
      };

      const orderResponse = await fetch(`${BACKEND_URL}/ordenes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        const payload = await orderResponse.json().catch(() => ({}));
        const msg = typeof payload.error === 'string' ? payload.error : 'No se pudo crear la orden';
        throw new Error(msg);
      }

      const newOrder = await orderResponse.json();
      const orderId = newOrder?._id || newOrder?.id;

      const productos = items.map(item => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const preferenceResponse = await fetch(`${BACKEND_URL}/pago/preferencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productos, orderId }),
      });

      if (!preferenceResponse.ok) {
        throw new Error('No se pudo generar la preferencia de pago');
      }
      const data = await preferenceResponse.json();
      if (!data.init_point) {
        throw new Error('No se obtuvo link de pago');
      }
      window.location.href = data.init_point;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error procesando el pago';
      setError(message);
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
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Ej: 123456789"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad / Provincia</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                placeholder="Ciudad, provincia"
                value={form.ciudad}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                placeholder="Calle y número"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="notas">Notas adicionales</label>
              <textarea
                id="notas"
                name="notas"
                rows={3}
                placeholder="Indicaciones para el envío u observaciones"
                value={form.notas}
                onChange={handleChange}
              />
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
