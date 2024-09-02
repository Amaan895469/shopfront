import React from "react";

const CartButton = ({ goToCart, cartItems }) => {
  return (
    <div className="fixed top-4 right-4">
      <button
        className="relative bg-zinc-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
        onClick={goToCart}
      >
        <i className="fas fa-shopping-cart text-2xl"></i>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>
  );
};
export default CartButton;
