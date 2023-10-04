import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white text-center py-0.1 bottom-0 w-full">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <a href="https://7ajar.agency/" className="underline">
            7ajar
          </a>{" "}
          &copy; 2023
        </div>
        <div>
          <Link to="/terms-of-service" className="hover:text-white">
            Terms of Service
          </Link>
          <span className="mx-3">|</span>
          <Link to="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
