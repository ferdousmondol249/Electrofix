import './App.css';
import {Outlet} from "react-router-dom"
import Header from "./component/Header"
import Footer from "./component/Footer"
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
      <ToastContainer />
    <header> 
      <Header/>
    </header>
     

    <main className="flex-grow p-4 min-h-[calc(100vh-200px)]">
      <Outlet />
    </main>


    <footer>
      <Footer/>
    </footer>
       
    </>
  )
}

export default App