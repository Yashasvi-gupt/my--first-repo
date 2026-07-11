import './ProductGrid.css';

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-bottom">
              <span className="product-price">₹{product.price.toFixed(2)}</span>
              <button type="button" onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
