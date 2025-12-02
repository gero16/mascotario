import { Link } from 'react-router-dom';

const LOGO_URL = 'https://res.cloudinary.com/geronicola/image/upload/v1764624562/mascotario/macgscolzsr8wbmxvtqt.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <img src={LOGO_URL} alt="Mascotario Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/tienda">Tienda</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}
