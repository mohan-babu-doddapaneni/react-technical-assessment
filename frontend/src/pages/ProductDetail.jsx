import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProduct(id);
        const data = res.data?.data;
        const p = data?.product || data || null;

        if (!p) {
          setError("Product not found.");
        } else {
          setProduct(p);
        }
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load product.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, Number(qty) || 1);
  };

  if (loading) return <p className="page">Loading product...</p>;
  if (error) return <p className="page error-text">{error}</p>;
  if (!product) return <p className="page">Product not found.</p>;

  const imageUrl = product.image || product.images?.[0]; // ✅ first image

  return (
    <div className="page product-detail">
      <div className="product-detail-image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="product-detail-image"
          />
        ) : (
          <div className="product-detail-image placeholder">No image</div>
        )}
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <div className="product-detail-price">$ {product.price}</div>
        {product.description && (
          <p className="product-detail-desc">{product.description}</p>
        )}
        <div className="product-detail-actions">
          <label>
            Qty:
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </label>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
