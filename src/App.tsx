import { Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Loader from './Loader'

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
    slug: 'pelota-anti-estres',
    descripcion: 'Ideal para juegos y reducir ansiedad en perros.',
    descripcion_larga: 'La pelota anti-estrés está fabricada con materiales resistentes, suaves y seguros, perfecta para que tu perro libere energía, juegue y mantenga una mente activa. Favorece el bienestar emocional, ayuda a combatir el aburrimiento, y es fácil de lavar. Su textura masajea las encías y promueve hábitos saludables de juego. ¡Una excelente opción para mantener a tu mascota feliz y entretenida durante horas! Ideal para tiradas largas y mordisqueos intensos.',
    precio: '$3.100',
    imagenes: [
      'https://res.cloudinary.com/geronicola/image/upload/v1764632822/mascotario/ehpransykdsrlalapbdn.jpg',
      'https://res.cloudinary.com/geronicola/image/upload/v1764632822/mascotario/mbpyba4kqjt93lhsor26.jpg',
      'https://res.cloudinary.com/geronicola/image/upload/v1764632822/mascotario/pf4xzqvfopibhtacw5ju.webp'
    ],
  },
  {
    nombre: 'Rascador doble nivel',
    slug: 'rascador-doble-nivel',
    descripcion: 'Diversión y comodidad para gatos inquietos.',
    descripcion_larga: 'Nuestro rascador doble nivel ofrece diversión, ejercicio y descanso para gatos de todas las edades. Incluye dos plataformas a diferentes alturas, material de sisal natural para afilar sus uñas, y una base sólida para máxima estabilidad. Fomenta el instinto natural de rascar y reduce el riesgo de daños en muebles. Su diseño moderno se adapta a cualquier ambiente del hogar. ¡El complemento perfecto para el bienestar y diversión diaria de tu gato! Fácil de armar y limpiar.',
    precio: '$9.600',
    imagenes: [
      'https://res.cloudinary.com/geronicola/image/upload/v1764633478/mascotario/vyclvmpgewimoraphn7v.jpg',
      "https://res.cloudinary.com/geronicola/image/upload/v1764633478/mascotario/gkwyackfq5ha50jeuxds.png"
    ],
  },
  {
    nombre: 'Comedero inteligente',
    slug: 'comedero-inteligente',
    descripcion: 'Dispensación automática, seguro y fácil de limpiar.',
    descripcion_larga: 'El comedero inteligente te ayuda a cuidar de tu mascota incluso cuando no estás en casa. Dispensador programable, capacidad para varios días y materiales aptos para alimentos. Ofrece porciones regulables, evitando el sobrepeso y promoviendo hábitos saludables. Incluye display digital, sistema anti-atascos y es sencillo de desmontar para su limpieza. ¡La tranquilidad de saber que tu mascota siempre tendrá su comida a tiempo y fresca! Compatible con alimento seco para perros y gatos.',
    precio: '$12.800',
    imagenes: [
      'https://res.cloudinary.com/geronicola/image/upload/v1764632822/mascotario/av7blshwicxy5id3rs2m.jpg',
      "https://res.cloudinary.com/geronicola/image/upload/v1764689697/mascotario/gdi600j3z28l1y12kxvl.jpg",
      "https://res.cloudinary.com/geronicola/image/upload/v1764689709/mascotario/iamkvrj4f64wdzsgdtir.jpg"
    ],
  },
];

function ProductDetail({ slug }: { slug: string }) {
  const producto = productos.find(p => p.slug === slug)
  const [imgIdx, setImgIdx] = useState(0)
  if (!producto) {
    return (
      <section className="store-section">
        <h1>Producto no encontrado</h1>
        <Link to="/tienda">Volver a la tienda</Link>
      </section>
    )
  }
  const total = producto.imagenes.length;
  const prevImg = () => setImgIdx(i => (i - 1 + total) % total)
  const nextImg = () => setImgIdx(i => (i + 1) % total)
  return (
    <section className="store-section">
      <h1>{producto.nombre}</h1>
      <div className="product-detail-container">
        <div className="product-slider">
          <img
            src={producto.imagenes[imgIdx]}
            alt={`${producto.nombre} foto ${imgIdx+1}`}
            className="product-slider-img"
          />
          {total > 1 && (
            <>
              <button
                onClick={prevImg}
                className="slider-arrow slider-arrow-left"
                aria-label="Anterior"
              >&lt;</button>
              <button
                onClick={nextImg}
                className="slider-arrow slider-arrow-right"
                aria-label="Siguiente"
              >&gt;</button>
            </>
          )}
          {total > 1 && (
            <div className="slider-dots">
              {producto.imagenes.map((_,idx)=>(
                <span key={idx} className={"slider-dot" + (idx===imgIdx?" active":"")}>●</span>
              ))}
            </div>
          )}
        </div>
        <div className="product-detail-info flex-center-center">
          <p className="desc product-detail-desc">{producto.descripcion}</p>
          <span className="price product-detail-price">{producto.precio}</span>
          <p className="product-detail-longdesc">{producto.descripcion_larga}</p>
          <button className="buy-btn product-detail-buy">Agregar al carrito</button>
          <Link to="/tienda" className="product-detail-back">← Volver a la tienda</Link>
        </div>
      </div>
    </section>
  )
}

function Store() {
  return (
    <section className="store-section">
      <h1>Nuestros productos</h1>
      <div className="store-products">
        {productos.map((p, i) => (
          <div className="product-card" key={i}>
            <div className="product-image" style={{ backgroundImage: `url('${p.imagenes[0]}')` }}></div>
            <div className="product-info">
              <h2>
                <Link to={`/tienda/${p.slug}`}>{p.nombre}</Link>
              </h2>
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
          <Route path="/tienda/:slug" element={<ProductSlugWrapper />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/loader" element={<Loader />} />
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

// Wrapper para mapear params a props del ProductDetail
function ProductSlugWrapper() {
  const { slug } = useParams();
  return <ProductDetail slug={slug || ""} />;
}

export default App
