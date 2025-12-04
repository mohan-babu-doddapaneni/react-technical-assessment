import React from "react";
import { useCart } from "../context/CartContext";

const Cart = ({ onClose }) => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-main">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-sub">
                      <span className="cart-item-price">
                        $ {item.price.toFixed(2)}
                      </span>
                      <span className="cart-item-qty">
                        × {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    />
                    <button
                      className="btn btn-secondary cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total-wrapper">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-amount">
                  $ {totalPrice.toFixed(2)}
                </span>
              </div>
              <button className="btn btn-primary" disabled>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
