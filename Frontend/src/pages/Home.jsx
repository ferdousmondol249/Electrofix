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
import BannerProduct from '../component/BannerProduct';
import AllProductHome from '../component/AllProductHome';
import LatestProduct from '../component/LatestProduct';




const Home = () => {
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
    <div>
      <main className="mt-4">
        <ProductTypeCarousel productTypes={productTypes}/>
        <BannerProduct/>
        <div>
          <h1 className='text-3xl text-pretty mt-10 font-bold ml-3'>Latest Product are in here</h1>
        <LatestProduct/>

        </div>
        <div>
        <h1 className='text-3xl text-pretty mt-10 font-bold ml-3'>All product</h1>
        <AllProductHome/>
       
        </div>
        
      </main>
    </div>
  );
};

export default Home;
