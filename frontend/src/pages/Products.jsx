import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts(filters);
      const list = res.data.data?.products || res.data.data || [];
      setProducts(list);
      setFiltered(list);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load products.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(products);
    } else {
      const term = search.toLowerCase();
      setFiltered(
        products.filter((p) => p.name.toLowerCase().includes(term))
      );
    }
  }, [search, products]);

  return (
    <div className="page products-page">
      <div className="page-inner">
        <div className="products-header">
          <h1>Products</h1>
          <div className="products-controls">
            <input
              className="search-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="number"
              className="price-input"
              placeholder="Min $"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="price-input"
              placeholder="Max $"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              onClick={() =>
                fetchProducts({
                  search: search || undefined,
                  minPrice: minPrice || undefined,
                  maxPrice: maxPrice || undefined,
                })
              }
            >
              Filter
            </button>
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="products-grid">
            {filtered.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => addToCart(p, 1)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
