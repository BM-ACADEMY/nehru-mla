import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p>&copy; 2025 [Client Name]. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="hover:text-green-400">Facebook</a>
          <a href="#" className="hover:text-green-400">Twitter</a>
          <a href="#" className="hover:text-green-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
