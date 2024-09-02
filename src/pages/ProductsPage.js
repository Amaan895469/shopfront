import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Overlay from "../components/Overlay";
import Menu from "../components/Menu";
import CartButton from "../components/CartButton";
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
          body: JSON.stringify({ customerId, productId, quantity: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      fetchCart();
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
  });

  const goToCart = () => {
    navigate(`/customer/cart?customerId=${customerId}`);
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <Overlay></Overlay>
      <h2 className="text-xl font-semibold text-white mb-4">
        Welcome, {customerName}!
      </h2>
      <h1 className="text-[2vw] font-bold text-white mb-10">Menu</h1>

      <Menu products={products} addToCart={addToCart}></Menu>

      <CartButton goToCart={goToCart} cartItems={cartItems}></CartButton>
    </div>
  );
}

export default ProductsPage;
