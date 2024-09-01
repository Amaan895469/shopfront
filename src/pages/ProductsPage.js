import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure FontAwesome is imported

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/product`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchProducts();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/cart?customerId=${customerId}`
      );
      const data = await response.json();
      setCartItems(data.customer.cart);
      setTotal(data.total);
      setCustomerName(data.customer.name); 
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId, productId, quantity: 1 }), // Ensure these are correct
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      fetchCart(); // Update cart after adding item
      alert("Product added to cart!");
    } catch (error) {
      console.error(
        "There was a problem with the add to cart operation:",
        error
      );
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchCart();
    }
  }, [customerId]);

  // Navigate to the cart page when the cart icon is clicked
  const goToCart = () => {
    navigate(
      `https://shopfront-ks3zz24u8-amaan895469s-projects.vercel.app/customer/cart?customerId=${customerId}`
    );
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <h1 className="absolute bottom-4 left-4 text-[3vw] leading-none tracking-tighter font-semibold text-zinc-300">
        Coreview Assessment
      </h1>
      <h2 className="text-xl font-semibold text-white mb-4">
        Welcome, {customerName}!
      </h2>
      <h1 className="text-[2vw] font-bold text-white mb-10">Menu</h1>

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

      {/* Cart Icon */}
      <div className="fixed top-4 right-4">
        <button
          className="relative bg-zinc-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
          onClick={goToCart} // Change the onClick to goToCart
        >
          <i className="fas fa-shopping-cart text-2xl"></i>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;
