import ProductCard from './ProductCard';
import { productos } from './productos';
import { useCart } from './CartContext';

interface Producto {
  nombre: string;
  slug: string;
  descripcion: string;
  precio: string;
  imagenes: string[];
}

export default function Store() {
  const { addToCart } = useCart();
  return (
    <section className="store-section">
      <h1>Nuestros productos</h1>
      <div className="store-products">
        {productos.map((p: Producto, i: number) => (
          <ProductCard
            producto={p}
            key={i}
            onAddToCart={() => addToCart({
              id: p.slug,
              name: p.nombre,
              price: Number(p.precio.replace(/[^0-9.-]+/g, "")),
              image: p.imagenes[0]
            })}
          />
        ))}
      </div>
    </section>
  );
}
