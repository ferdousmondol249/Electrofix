import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCardHome from "../component/ProductCardHome";
import ProductTypeCarousel from '../component/ProductTypeCarousel'; 
import HeadPhone from '../assets/Catagory/Headphone.jpg';
import laptop from '../assets/Catagory/laptop.jpg';
import Mobile from '../assets/Catagory/mobile.jpg';
import Tv from '../assets/Catagory/Tv.jpg';
import Watch from '../assets/Catagory/watch.jpg';
import earbud from '../assets/Catagory/earbud.jpg';
import Keyboard from '../assets/Catagory/keyboard.jpg';
import Mouse from '../assets/Catagory/mouse.jpg';
import Speaker from '../assets/Catagory/speaker.jpg';
import PowerBank from '../assets/Catagory/powerbank.jpg';
import Charger from '../assets/Catagory/Charger.jpg';
import joystick from '../assets/Catagory/joystick.jpg';
import minipc from '../assets/Catagory/minipc.jpg';
import slefiestick from '../assets/Catagory/slefiestick.jpg';
import tripod from '../assets/Catagory/tripod.jpg';
import remotecar from '../assets/Catagory/remotecar.jpg';


const ProductPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productType = queryParams.get("type");

  const [product, setProduct] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProduct = async () => {
    if (!productType) {
      console.log("No product type provided");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/products?type=${productType}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productType]);

  const filteredProducts = product.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!priceRange) return matchesSearch;

    if (priceRange === "10000-") {
      return item.discountPrice > 10000 && matchesSearch;
    }

    const [min, max] = priceRange.split("-").map(Number);
    return item.discountPrice >= min && item.discountPrice <= max && matchesSearch;
  });



    const productTypes = [
      { name: 'Mobile', image: Mobile },  
      { name: 'Laptop', image: laptop }, 
      { name: 'TV', image: Tv },
      { name: 'Watch', image: Watch },
      { name: 'Headphone', image: HeadPhone },
      { name: 'Earbud', image: earbud },
      { name: 'Keyboard', image: Keyboard },
      { name: 'Mouse', image: Mouse },
      { name: 'Speaker', image: Speaker },
      { name: 'Power Bank', image: PowerBank },
      { name: 'Charger', image: Charger },
      { name: 'Joystick', image: joystick },
      { name: 'Mini PC', image: minipc },
      { name: 'SlefieStick', image: slefiestick },
      { name: 'Tripod', image: tripod },
      { name: 'Remote Car', image: remotecar },  
  
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductTypeCarousel productTypes={productTypes} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              {/* Search Input */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Products</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {["0-1000", "1000-3000", "3000-5000", "5000-10000", "10000-"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setPriceRange(priceRange === range ? null : range)}
                      className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
                        ${
                          priceRange === range
                            ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      {range === "10000-" ? "> $10,000" : `$${range.split("-").join(" - $")}`}
                    </button>
                  ))}
                </div>

                {priceRange && (
                  <button
                    onClick={() => setPriceRange(null)}
                    className="mt-4 w-full px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCardHome key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
