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
      {/* Sección de reseñas / Instagram igual que antes... */}
    </section>
  );
}
