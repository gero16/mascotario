import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

const LOGO_URL = 'https://res.cloudinary.com/geronicola/image/upload/v1764624562/mascotario/macgscolzsr8wbmxvtqt.png'

function Home() {
  return (
    <section className="landing">
      <header className="landing-header">
        <h1>Mascotario</h1>
        <p className="slogan">Tu tienda ideal para consentir a tus mascotas</p>
        <Link to="/tienda" className="cta-btn">Explorar Tienda</Link>
      </header>
      <div className="landing-features">
        <div className="feature-card">
          <span role="img" aria-label="Carrito">🛒</span>
          <h3>Compra Fácil</h3>
          <p>Elige, paga y recibe en casa sin complicaciones.</p>
        </div>
        <div className="feature-card">
          <span role="img" aria-label="Mascotas">🐾</span>
          <h3>Para todo tipo de mascotas</h3>
          <p>Productos seleccionados para perros, gatos y más.</p>
        </div>
        <div className="feature-card">
          <span role="img" aria-label="Atención">💬</span>
          <h3>Atención Personalizada</h3>
          <p>Te ayudamos en cada paso, antes y después de tu compra.</p>
        </div>
      </div>
      {/* Sección de reseñas */}
      <section className="reviews-section">
        <h2>Opiniones de nuestros clientes</h2>
        <div className="reviews-list">
          <div className="review-card">
            <p className="review-text">“Excelente servicio y atención. ¡Mi perro está feliz con su nuevo juguete!”</p>
            <span className="review-author">– Carlos G.</span>
          </div>
          <div className="review-card">
            <p className="review-text">“Muy rápidos en la entrega y productos de calidad.”</p>
            <span className="review-author">– Laura A.</span>
          </div>
          <div className="review-card">
            <p className="review-text">“Atención personalizada y gran variedad.”</p>
            <span className="review-author">– Marta R.</span>
          </div>
        </div>
      </section>
      {/* Sección de Instagram */}
      <section className="instagram-section">
        <h2>Últimas publicaciones en Instagram</h2>
        <div className="instagram-posts">
          <div className="insta-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=300&q=80')"}}></div>
          <div className="insta-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=300&q=80')"}}></div>
          <div className="insta-img" style={{backgroundImage: "url('https://res.cloudinary.com/geronicola/image/upload/v1764633668/mascotario/x6qsevtjkjd8c3jpuycq.jpg')"}}></div>
        </div>
        <p className="instagram-cta">
          Síguenos en <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@mascotario</a> para ver más
        </p>
      </section>
    </section>
  )
}

const productos = [
  {
    nombre: 'Pelota anti-estrés',
    descripcion: 'Ideal para juegos y reducir ansiedad en perros.',
    precio: '$3.100',
    img: 'https://res.cloudinary.com/geronicola/image/upload/v1764632822/mascotario/mbpyba4kqjt93lhsor26.jpg',
  },
  {
    nombre: 'Rascador doble nivel',
    descripcion: 'Diversión y comodidad para gatos inquietos.',
    precio: '$9.600',
    img: 'https://res.cloudinary.com/geronicola/image/upload/v1764633478/mascotario/vyclvmpgewimoraphn7v.jpg',
  },
  {
    nombre: 'Comedero inteligente',
    descripcion: 'Dispensación automática, seguro y fácil de limpiar.',
    precio: '$12.800',
    img: 'https://res.cloudinary.com/geronicola/image/upload/v1764632822/mascotario/av7blshwicxy5id3rs2m.jpg',
  },
];

function Store() {
  return (
    <section className="store-section">
      <h1>Nuestros productos</h1>
      <div className="store-products">
        {productos.map((p, i) => (
          <div className="product-card" key={i}>
            <div className="product-image" style={{ backgroundImage: `url('${p.img}')` }}></div>
            <div className="product-info">
              <h2>{p.nombre}</h2>
              <p className="desc">{p.descripcion}</p>
              <span className="price">{p.precio}</span>
              <button className="buy-btn">Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setForm({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section className="contact-section">
      <h1>Contacto</h1>
      <p>¿Tienes dudas, consultas o sugerencias? ¡Escríbenos!</p>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">Enviar mensaje</button>
        {enviado && <div className="sent-alert">¡Mensaje enviado correctamente!</div>}
      </form>
    </section>
  );
}

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo-link">
            <img src={LOGO_URL} alt="Mascotario logo" className="navbar-logo" />
          </Link>
          <div className="navbar-links">
            <Link to="/">Inicio</Link>
            <Link to="/tienda">Tienda</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>Mascotario &copy; 2025. Todos los derechos reservados.</p>
          <p>Contacto: hola@mascotario.com | Tel: +54 11 1234-5678</p>
        </div>
      </footer>
    </>
  )
}

export default App
