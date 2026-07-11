import { useMemo, useState } from 'react';
import { products as productData } from './data/products.js';
import ProductGrid from './components/ProductGrid.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import './App.css';

const categories = ['All', 'Electronics', 'Computers', 'Audio', 'Smart Home'];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">amazon2</div>
        <div className="search-bar">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="layout">
        <section className="product-panel">
          <div className="product-header">
            <h1>Shop the latest electronics</h1>
            <p>Browse products, add items to cart, and manage quantities instantly.</p>
          </div>

          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        </section>

        <aside className="cart-panel">
          <CartSidebar
            items={cartItems}
            total={cartTotal}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClear={clearCart}
          />
        </aside>
      </main>
    </div>
  );
}
