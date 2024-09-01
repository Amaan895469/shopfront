import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateCustomer = async () => {
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/customer/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();
      navigate(
        `${process.env.REACT_APP_BACKEND_URL}/product?customerId=${data.customerId}`
      );
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <h1 className="absolute bottom-4 left-4 text-[3vw] leading-none tracking-tighter font-semibold text-zinc-300">
        Coreview Assessment
      </h1>

      <div className="flex flex-col items-center space-y-8">
        <p className="text-[2vw] font-semibold text-zinc-200">Place Order:</p>
        <input
          type="text"
          placeholder="Enter Customer name"
          className="text-[1.5vw] font-semibold text-black bg-zinc-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleCreateCustomer}
          className="text-[1.5vw] font-semibold text-white bg-zinc-700 py-2 px-6 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        >
          Start Ordering
        </button>
      </div>
    </div>
  );
}

export default HomePage;
