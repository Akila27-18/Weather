import React, { useState } from "react";
import { products } from "./products";

const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProducts = products.filter((product) => {
    return (
      (categoryFilter === "" || product.category === categoryFilter) &&
      (priceFilter === "" || product.price <= Number(priceFilter))
    );
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Product Store</h1>

      {/* Filters */}
      <div className="flex justify-center space-x-4 mb-6">
        <select
          className="border p-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow flex flex-col justify-between"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-8 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="font-bold text-lg mt-2">
              Total: ${totalPrice}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
