import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const portadaImages = [
  {
    url: 'https://res.cloudinary.com/geronicola/image/upload/v1764855092/mascotario/o8anxb8nlgevqpdojnue.jpg',
    alt: 'Pareja paseando a sus mascotas con productos de Mascotario (portada 1)',
    position: 'center 78%',
    tag: 'Active lifestyle',
    highlight: 'BOTELLA',
    headline: 'DOBLE',
    subline: 'Arneses ergonómicos y outfits listos para cada paseo.'
  },
  {
    url: 'https://res.cloudinary.com/geronicola/image/upload/v1764855104/mascotario/ifux3mbgvnapshfqdaqd.jpg',
    alt: 'Perro y gato con productos de Mascotario (portada 2)',
    position: 'center 74%',
    tag: 'Colección training',
    highlight: 'PELO',
    headline: 'CERO',
    subline: 'Libertad total y estimulación segura para cada juego.'
  },
];

export default function Home() {
  const [active, setActive] = useState(0);

  // Autoslide cada 5s
  useEffect(() => {
    const int = setInterval(() => setActive(a => (a + 1) % portadaImages.length), 10000);
    return () => clearInterval(int);
  }, []);

  const activeSlide = portadaImages[active];
  const objectPos = activeSlide.position || 'center 66%';

  return (
    <>
      <div className="hero-slider">
        <img
          src={activeSlide.url}
          alt={activeSlide.alt}
          loading="lazy"
          className="hero-cover-img"
          style={{ objectPosition: objectPos }}
        />
        <div className="slider-caption">
          {activeSlide.tag && <p className="slider-eyebrow">{activeSlide.tag}</p>}
          <h2>
            {activeSlide.highlight && <span className="caption-strong">{activeSlide.highlight}</span>}
            {activeSlide.headline}
          </h2>
          <p className="caption-subline">{activeSlide.subline}</p>
        </div>
        <div className="slider-dots">
          {portadaImages.map((_, i) => (
            <span key={i} className={i === active ? 'dot active' : 'dot'} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
      <section className="landing">
        <div className="landing-hero">
          <header className="landing-header">
            <h1>Mascotario</h1>
            <p className="slogan">Tu tienda ideal para consentir a tus mascotas</p>
            <Link to="/tienda" className="cta-btn">Explorar Tienda</Link>
          </header>
          <figure className="landing-cover">
            <img
              src="https://res.cloudinary.com/geronicola/image/upload/v1764855122/mascotario/ez4bayx6frsvsoa2zsrl.jpg"
              alt="Dúo de mascotas jugando con accesorios de Mascotario"
              loading="lazy"
            />
          </figure>
        </div>
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
            <div className="insta-img insta-img-one"></div>
            <div className="insta-img insta-img-two"></div>
            <div className="insta-img insta-img-three"></div>
          </div>
          <p className="instagram-cta">
            Síguenos en <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@mascotario</a> para ver más
          </p>
        </section>
      </section>
    </>
  );
}
