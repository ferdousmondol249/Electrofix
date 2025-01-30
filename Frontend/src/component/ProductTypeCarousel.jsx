import { useNavigate } from "react-router-dom";
const ProductTypeCarousel = ({ productTypes }) => {
   const navigate= useNavigate();
  return (
    <div className="container mx-auto p-2 mt-4">
      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
        {productTypes.map((type) => (
          <div key={type.name} className="relative group">
            {/* Reduced size of the image container */}
            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
              <img
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                src={type.image}
                alt={type.name}
                onClick={() => navigate(`/products?type=${type.name}`)}
              />
            </div>

            {/* Smaller text size for the name */}
            <div className="mt-1 text-center text-xs font-medium text-gray-700">
              {type.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTypeCarousel;
