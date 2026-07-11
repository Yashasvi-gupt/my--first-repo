import './CartSidebar.css';

export default function CartSidebar({ items, total, onRemove, onUpdateQuantity, onClear }) {
  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button type="button" className="clear-cart" onClick={onClear}>
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">Your cart is empty.</div>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-actions">
                  <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
        <button type="button" className="checkout-button" disabled={items.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}
