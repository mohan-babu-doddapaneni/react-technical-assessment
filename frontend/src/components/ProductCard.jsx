import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const id = product.id || product.productId;
  const { name, price } = product;
  const imageUrl = product.image || product.images?.[0]; // ✅ use first image

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <div className="product-image-wrapper">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="product-image" />
          ) : (
            <div className="product-image placeholder">No image</div>
          )}
        </div>
      </Link>
      <div className="product-info">
        <Link to={`/products/${id}`} className="product-title">
          {name}
        </Link>
        <div className="product-price">$ {price.toFixed(2)}</div>
      </div>
      <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
