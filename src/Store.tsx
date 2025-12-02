import ProductCard from './ProductCard';
import { productos } from './productos';

interface Producto {
  nombre: string;
  slug: string;
  descripcion: string;
  precio: string;
  imagenes: string[];
}

export default function Store() {
  return (
    <section className="store-section">
      <h1>Nuestros productos</h1>
      <div className="store-products">
        {productos.map((p: Producto, i: number) => (
          <ProductCard producto={p} key={i} />
        ))}
      </div>
    </section>
  );
}
