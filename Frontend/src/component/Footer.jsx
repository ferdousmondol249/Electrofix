import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 px-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Our Brands</h2>
          <ul className="space-y-1 text-sm">
            <li>Whirlpool</li>
            <li>Conion</li>
            <li>Sony</li>
            <li>Hisense</li>
            <li>Hitachi</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Shopping With Us</h2>
          <ul className="space-y-1 text-sm">
            <li>Quick EMIs</li>
            <li>Super Kisti</li>
            <li>Refund and Return Policy</li>
            <li>Warranty Terms</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">About Us</h2>
          <ul className="space-y-1 text-sm">
            <li>Why Best Electronics?</li>
            <li>Our Journey</li>
            <li>Corporate Sales</li>
            <li>Zaman Group</li>
            <li>Contact Us</li>
          </ul>
          <div className="text-center text-gray-400 text-xs mt-6">
        © 2025 Best Electronics. All Rights Reserved.
        </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Quick Navigation</h2>
          <ul className="space-y-1 text-sm">
            <li>Shop</li>
            <li>Checkout</li>
            <li>Store Locator</li>
            <li>Order Tracking</li>
            <li>Find Our Store</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Find Our Store</h2>
          <p className="text-sm mb-2">
            About 100 showrooms and a dedicated distribution network all over
            Bangladesh. Best Electronics is your one-stop shop for affordable
            electronic products with reliable after-sales service.
          </p>
          <div className="underline text-blue-700 hover:text-blue-400 mb-2">
            <Link to={'/outlet'}>
              To see our nearest outlet
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://www.facebook.com/ferdous.mondol249" className="text-blue-600">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/ferdous4022/" className="text-blue-600">
              <FaSquareInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ferdous-mondol-249a85210/" className="text-blue-600">
              <ImLinkedin size={20} />
            </a>
          </div>
        </div>
        
        
      </div>

     
    </footer>
  );
};

export default Footer;
