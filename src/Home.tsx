import { Link } from 'react-router-dom';
export default function Home() {
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
  );
}
