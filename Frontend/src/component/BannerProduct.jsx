import { useEffect, useState } from 'react';
import image1 from '../assets/Banner/img1.webp';
import image2 from '../assets/Banner/img2.webp';
import image3 from '../assets/Banner/img3.jpg';
import image4 from '../assets/Banner/img4.jpg';
import image5 from '../assets/Banner/img5.webp';

import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 rounded mt-10">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1">
              <FaAngleLeft />
            </button>
            <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1">
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="hidden md:flex h-full w-full overflow-hidden">
          <div
            className="flex transition-all"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {desktopImages.map((imageURL, index) => (
              <div className="w-full h-full min-w-full min-h-full" key={imageURL}>
                <img
                  id={`image-${index + 1}`} 
                  src={imageURL}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
