import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const customerId = searchParams.get("customerId");

  useEffect(() => {
    async function fetchCart() {
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
    }

    fetchCart();
  }, [customerId]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId,
            productId,
            quantity: newQuantity,
          }),
        }
      );

      const data = await response.json();
      setCartItems(data.customer.cart);
      setTotal(data.total);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/cart/remove`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId, productId }),
        }
      );

      const data = await response.json();
      setCartItems(data.customer.cart);
      setTotal(data.total);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleApplyDiscount = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/apply-discount`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId, discountCode }),
        }
      );

      const data = await response.json();
      setTotal(data.total); 
      alert(data.message || "Discount applied successfully!");
    } catch (error) {
      console.error("Error applying discount:", error);
    }
  };

  const handleCheckout = async () => {
    if (total > 10 && paymentMethod === "Cash") {
      alert("You must pay with a Credit Card for totals over €10");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId, discountCode, paymentMethod }),
        }
      );

      const result = await response.json();
      alert(result.message);
      navigate("/"); 
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <h1 className="absolute bottom-4 left-4 text-[3vw] leading-none tracking-tighter font-semibold text-zinc-300">
        Coreview Assessment
      </h1>

      <h1 className="text-[2vw] font-bold text-white mb-10">
        {customerName}'s Cart
      </h1>

      <div className="w-full max-w-3xl bg-zinc-700 rounded-lg shadow-md p-6 text-white">
        {cartItems.map((item) => (
          <div
            key={item.drinkId._id}
            className="flex items-center justify-between mb-4 border-b border-zinc-500 pb-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.drinkId.name}</h2>
              <p className="text-sm text-zinc-300">
                Price: €{item.drinkId.price} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleQuantityChange(item.drinkId._id, item.quantity - 1)
                }
                className="bg-zinc-600 text-white px-2 py-1 rounded-full hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                disabled={item.quantity === 1}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="mx-4 text-lg">{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item.drinkId._id, item.quantity + 1)
                }
                className="bg-zinc-600 text-white px-2 py-1 rounded-full hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                onClick={() => handleRemove(item.drinkId._id)}
                className="ml-4 text-red-500 hover:text-red-400 focus:outline-none"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 text-lg font-semibold">
          <h3>Total: €{total.toFixed(2)}</h3>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Discount Code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="bg-zinc-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          />
          <button
            onClick={handleApplyDiscount}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
          >
            Apply Discount
          </button>
          <div className="mt-4">
            <label className="mr-4">
              <input
                type="radio"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="Cash"
                checked={paymentMethod === "Cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Cash
            </label>
          </div>
          <button
            onClick={handleCheckout}
            className="ml-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
