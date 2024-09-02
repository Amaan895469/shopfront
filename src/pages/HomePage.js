import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCustomer from "../components/CreateCustomer";
import Overlay from "../components/Overlay";
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
      console.log();
      navigate(`/products?customerId=${data.customerId}`);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <Overlay></Overlay>
      <CreateCustomer
        name={name}
        setName={setName}
        handleCreateCustomer={handleCreateCustomer}
      ></CreateCustomer>
    </div>
  );
}

export default HomePage;
