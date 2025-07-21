// src/components/ThankYou.jsx
import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-700">Thank you for purchasing the course.</p>
      <Link to="/" className="mt-6 inline-block text-pink-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

export default ThankYou;
