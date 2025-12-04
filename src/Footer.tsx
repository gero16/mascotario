import './Footer.css';

const footerColumns = [
  {
    title: 'Servicio al cliente',
    links: [
      { label: 'Garantía Mascotario', href: '#' },
      { label: 'Cambios y devoluciones', href: '#' },
      { label: 'Políticas de envío', href: '#' },
      { label: 'Rastrea tu pedido', href: '#' }
    ]
  },
  {
    title: 'Sobre Mascotario',
    links: [
      { label: 'Quiénes somos', href: '/contacto' },
      { label: 'Preguntas frecuentes', href: '#' },
      { label: 'Políticas de privacidad', href: '#' },
      { label: 'Términos y condiciones', href: '#' }
    ]
  },
  {
    title: 'Redes sociales',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'TikTok', href: 'https://tiktok.com' },
      { label: 'YouTube', href: 'https://youtube.com' }
    ]
  }
];

const paymentBrands = ['Amex', 'Diners', 'Discover', 'JCB', 'Mastercard', 'PayPal', 'Shop Pay', 'VISA'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <section className="footer-newsletter">
          <p className="footer-eyebrow">ÚNETE A MASCOTARIO</p>
          <h2>
            <span>ÚNETE</span> A LA MANADA
          </h2>
          <p className="footer-description">
            Accede a lanzamientos exclusivos, guías de entrenamiento y cupones especiales. Además, recibe
            instantáneamente 15% de descuento en tu primer pedido.
          </p>
          <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Email" aria-label="Correo electrónico" required />
            <button type="submit" aria-label="Enviar correo">→</button>
          </form>
        </section>

        <section className="footer-links">
          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="footer-bottom">
          <p>© {year} Mascotario. Todos los derechos reservados.</p>
          <div className="payment-logos">
            {paymentBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
