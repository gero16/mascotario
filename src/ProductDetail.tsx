import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from './productos';
import { useCart } from './CartContext';
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
  const { addToCart } = useCart();

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
        {/* Slider de imágenes */}
        <div className="product-slider">
          <img
            src={producto.imagenes[imgIdx]}
            alt={producto.nombre}
            className="product-slider-img"
          />
          {/* Thumbnails (dots en mobile) */}
          <div className="product-detail-thumbs">
            {producto.imagenes.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={producto.nombre}
                onClick={() => setImgIdx(idx)}
                style={{ cursor: 'pointer', width: 60, margin: 2, border: imgIdx === idx ? '2px solid #fe8365' : '2px solid #eee', borderRadius: '8px', transition: 'border 0.13s' }}
                className={imgIdx === idx ? 'selected' : ''}
              />
            ))}
          </div>
        </div>
        {/* Info del producto */}
        <div className="product-detail-info">
          <h2>{producto.nombre}</h2>
          <span className="product-detail-price">{producto.precio}</span>
          <div className="product-detail-longdesc">{producto.descripcion_larga}</div>
          <button onClick={() => addToCart({
            id: producto.slug,
            name: producto.nombre,
            price: Number(producto.precio.replace(/[^0-9.-]+/g, "")),
            image: producto.imagenes[imgIdx]
          })} className="buy-btn product-detail-buy">Agregar al carrito</button>
          <Link to="/tienda" className="product-detail-back">← Volver a la tienda</Link>
        </div>
      </div>
    </section>
  );
}
