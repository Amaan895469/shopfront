import React from 'react'

export const Menu = (products,addToCart) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-0">
      {products.map((product, index) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform transform hover:scale-105"
        >
          <img
            src={`/${index + 1}.jpeg`}
            alt={product.name}
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          <h2 className="text-xl font-semibold text-zinc-800 mb-2">
            {product.name}
          </h2>
          <p className="text-lg font-medium text-zinc-600 mb-4">
            Price: €{product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product._id)}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
