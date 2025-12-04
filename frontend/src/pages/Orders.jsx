import React, { useEffect, useState } from "react";
import { getOrders } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getOrders();
        const data = res.data.data?.orders || res.data.data || [];
        setOrders(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="page">
      <div className="page-inner orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your recent purchases and their status.</p>
        </div>

        {loading && <p>Loading orders...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p>You don’t have any orders yet.</p>
        )}

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">Order #{order.id}</span>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <span
                  className={`order-status order-status-${order.status?.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items?.map((item) => (
                  <div key={item.productId} className="order-item-row">
                    <span className="order-item-name">
                      {item.productName || item.name}
                    </span>
                    <span className="order-item-price">
                      {item.quantity} × $ {item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total-label">Order total</span>
                <span className="order-total">
                  $ {order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
