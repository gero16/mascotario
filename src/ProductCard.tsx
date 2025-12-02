import { useNavigate } from 'react-router-dom';
interface Producto {
  nombre: string;
  slug: string;
  descripcion: string;
  precio: string;
  imagenes: string[];
}
interface ProductCardProps {
  producto: Producto;
  onAddToCart?: () => void;
}
export default function ProductCard({ producto, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={e => {
        if ((e.target as HTMLElement).closest('button')) return;
        navigate(`/tienda/${producto.slug}`);
      }}
    >
      <div
        className="product-image"
        style={{ backgroundImage: `url('${producto.imagenes[0]}')` }}
      ></div>
      <div className="product-info">
        <h2>
          <span style={{ textDecoration: 'none', color: '#fff' }}>{producto.nombre}</span>
        </h2>
        <p className="desc">{producto.descripcion}</p>
        <span className="price">{producto.precio}</span>
        <button className="buy-btn" onClick={e => { e.stopPropagation(); onAddToCart && onAddToCart(); }}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
