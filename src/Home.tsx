import { useState, useEffect, useMemo } from 'react';
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

const instagramPosts = [
  {
    id: 'ig-10',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80',
    caption: 'Nuevos sets FurClean listos para la temporada de viajes 🧳🐾',
    dateLabel: '05 Feb',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-09',
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80',
    caption: 'Kit HydraDuo + snacks para aventuras largas 🚰🍖',
    dateLabel: '03 Feb',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-08',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80',
    caption: 'Clientes felices estrenando correas antitirones 💛',
    dateLabel: '01 Feb',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-07',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80',
    caption: 'Recordatorio: lavá tu FurClean cada 10 usos 😉',
    dateLabel: '30 Ene',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-06',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=400&q=80',
    caption: 'Nuevo color coral para la HydraDuo edición verano 🌺',
    dateLabel: '28 Ene',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-05',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80',
    caption: 'Pañuelos reversibles, edición picnic disponible 🧺',
    dateLabel: '26 Ene',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-04',
    image: 'https://images.unsplash.com/photo-1477973770766-6228305816df?auto=format&fit=crop&w=400&q=80',
    caption: 'Test de resistencia en arneses acolchados ✔️',
    dateLabel: '24 Ene',
    link: 'https://instagram.com/mascotario'
  },
  {
    id: 'ig-03',
    image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=400&q=80',
    caption: 'Tips para mantener a tu gato hidratado todo el día 😺',
    dateLabel: '22 Ene',
    link: 'https://instagram.com/mascotario'
  },
];

const VISIBLE_POSTS = 4;

export default function Home() {
  const [active, setActive] = useState(0);
  const [postStart, setPostStart] = useState(0);

  // Autoslide cada 5s
  useEffect(() => {
    const int = setInterval(() => setActive(a => (a + 1) % portadaImages.length), 10000);
    return () => clearInterval(int);
  }, []);

  const activeSlide = portadaImages[active];
  const objectPos = activeSlide.position || 'center 66%';

  const visiblePosts = useMemo(() => {
    const count = Math.min(VISIBLE_POSTS, instagramPosts.length);
    return Array.from({ length: count }).map((_, idx) => {
      const post = instagramPosts[(postStart + idx) % instagramPosts.length];
      return { ...post, key: `${post.id}-${idx}` };
    });
  }, [postStart]);

  const handleNextPosts = () => {
    setPostStart(prev => (prev + 1) % instagramPosts.length);
  };

  const handlePrevPosts = () => {
    setPostStart(prev => (prev - 1 + instagramPosts.length) % instagramPosts.length);
  };
  const canSlidePosts = instagramPosts.length > VISIBLE_POSTS;

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
      </section>
      <section className="spotlight-section">
        <figure className="spotlight-image">
          <img
            src="https://res.cloudinary.com/geronicola/image/upload/v1764859316/mascotario/slvx0iyi6wpg0qqtdht8.png"
            alt="Botella portátil HydraDuo con cuenco integrado"
            loading="lazy"
          />
        </figure>
        <div className="spotlight-overlay">
          <div className="spotlight-copy">
            <p className="spotlight-eyebrow">Botella HydraDuo</p>
            <h2>Lleva agua y snacks en un solo giro</h2>
            <p className="spotlight-description">
              Nuestro dispensador portátil integra depósito de 550 ml, cuenco desplegable
              y contenedor hermético para alimento. Hidrata y premia a tu peludo sin cargar accesorios extras.
            </p>
            <ul className="spotlight-list">
              <li>Válvula antiderrames y bloqueo de doble clic.</li>
              <li>Libre de BPA y fácil de desmontar para limpieza.</li>
              <li>Incluye correa para colgar en mochila o cinturón.</li>
            </ul>
            <div className="spotlight-cta">
              <Link to="/tienda" className="cta-btn">Comprar HydraDuo</Link>
              <Link to="/contacto" className="hero-secondary">Quiero más info</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="landing landing-secondary">
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
          <div className="instagram-header">
            <div>
              <h2>Últimas publicaciones en Instagram</h2>
              <p>Mostramos siempre las 4 más recientes. Usa el slider para ver aún más.</p>
            </div>
            <div className="instagram-controls">
              <button
                className="instagram-arrow"
                onClick={handlePrevPosts}
                disabled={!canSlidePosts}
                aria-label="Ver publicaciones anteriores"
              >
                ‹
              </button>
              <button
                className="instagram-arrow"
                onClick={handleNextPosts}
                disabled={!canSlidePosts}
                aria-label="Ver publicaciones siguientes"
              >
                ›
              </button>
            </div>
          </div>
          <div className="instagram-slider">
            {visiblePosts.map(post => (
              <article key={post.key} className="instagram-card">
                <div
                  className="instagram-thumb"
                  style={{ backgroundImage: `url('${post.image}')` }}
                  role="img"
                  aria-label={post.caption}
                />
                <div className="instagram-card-body">
                  <p className="instagram-caption">{post.caption}</p>
                  <span className="instagram-date">{post.dateLabel}</span>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    Ver publicación
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="instagram-cta">
            Síguenos en{' '}
            <a href="https://instagram.com/mascotario" target="_blank" rel="noopener noreferrer">
              @mascotario
            </a>{' '}
            para ver más
          </p>
        </section>
      </section>
    </>
  );
}
