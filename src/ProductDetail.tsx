import { useParams, Link } from 'react-router-dom';
import { productos } from './productos';
interface Producto {
  nombre: string;
  slug: string;
  descripcion: string;
  descripcion_larga: string;
  precio: string;
  imagenes: string[];
}

export default function ProductDetail() {
  const { slug } = useParams();
  const producto: Producto | undefined = productos.find(p => p.slug === slug);
  const [imgIdx, setImgIdx] = React.useState(0);

  if (!producto) {
    return (
      <section className="store-section">
        <h2>Producto no encontrado</h2>
        <Link to="/tienda">← Volver a la tienda</Link>
      </section>
    );
  }
  return (
    <section className="store-section">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={producto.imagenes[imgIdx]} alt={producto.nombre} />
          {/* thumbnails */}
          <div className="product-detail-thumbs">
            {producto.imagenes.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={producto.nombre}
                onClick={() => setImgIdx(idx)}
                className={imgIdx === idx ? 'selected' : ''}
                style={{ cursor: 'pointer', width: 60, margin: 2, border: imgIdx === idx ? '2px solid #fe8365' : '2px solid #eee' }}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-info">
          <h2>{producto.nombre}</h2>
          <span className="price">{producto.precio}</span>
          <p>{producto.descripcion_larga}</p>
          <button className="buy-btn">Agregar al carrito</button>
          <Link to="/tienda" className="product-detail-back">← Volver a la tienda</Link>
        </div>
      </div>
    </section>
  );
}
