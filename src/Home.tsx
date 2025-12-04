import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const portadaImages = [
  {
    url: 'https://res.cloudinary.com/geronicola/image/upload/v1764855092/mascotario/o8anxb8nlgevqpdojnue.jpg',
    alt: 'Pareja paseando a sus mascotas con productos de Mascotario (portada 1)',
    position: 'center 88%',
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
  {
    url: 'https://res.cloudinary.com/geronicola/image/upload/v1764855090/mascotario/rfczl5wqv7arbirvy7ri.jpg',
    alt: 'Perro y gato con productos de Mascotario (portada 2)',
    position: 'center 70%',
    tag: 'Colección training',
    highlight: 'AGUA',
    headline: 'LISTA',
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
          <div className="hero-copy">
            <p className="hero-eyebrow">Novedades portátiles Mascotario</p>
            <header className="landing-header">
              <h1>Hidratación inteligente y ropa sin pelos</h1>
              <p className="slogan">
                Botellas 2 en 1 con cuenco integrado y quita pelusas reutilizables para paseos limpios y sin derrames.
              </p>
            </header>
            <div className="hero-pill-row">
              <span>Botella HydraDuo</span>
              <span>Quita Pelusa FurClean</span>
              <span>Snacks + agua en un solo giro</span>
            </div>
            <ul className="hero-list">
              <li>Cuenco integrado para servir agua al instante.</li>
              <li>Compartimento hermético para snacks o alimento.</li>
              <li>Removedor reutilizable que deja tus outfits impecables.</li>
            </ul>
            <div className="hero-cta-row">
              <Link to="/tienda" className="cta-btn">Ver catálogo</Link>
              <Link to="/contacto" className="hero-secondary">Solicitar combo</Link>
            </div>
          </div>
          <div className="hero-showcase">
            <figure className="landing-cover">
              <img
                src="https://res.cloudinary.com/geronicola/image/upload/v1764855122/mascotario/ez4bayx6frsvsoa2zsrl.jpg"
                alt="Dúo de mascotas jugando con accesorios de Mascotario"
                loading="lazy"
              />
            </figure>
            <article className="hero-product-card bottle-card">
              <span className="hero-chip">HydraDuo</span>
              <h3>Botella 2 en 1</h3>
              <p>550 ml de agua + tarro plegable y espacio para snacks.</p>
              <div className="hero-stats">
                <span>Libre de BPA</span>
                <span>Click to serve</span>
              </div>
            </article>
            <article className="hero-product-card lint-card">
              <span className="hero-chip">FurClean</span>
              <h3>Quita Pelusa</h3>
              <p>Silicona reutilizable que elimina pelos al instante.</p>
            </article>
          </div>
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
