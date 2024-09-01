import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./components/cart";

function App() {
  const customerId = "customer_id"; // Replace with actual customer ID logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={<ProductsPage customerId={customerId} />}
        />
        <Route
          path="/customer/cart"
          element={<Cart customerId={customerId} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
  