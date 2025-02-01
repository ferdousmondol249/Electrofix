import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import OutletPage from "../pages/OutletPage";
import AdminPage from "../pages/Admin";
import DashBoard from "../pages/DashBoard";
import UserList from "../pages/UserList";
import ProductList from "../pages/Product";
import UploadProduct from "../pages/UploadProduct";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import PaymentPage from "../pages/PaymentPage";
import SearchPage from "../pages/SearchPage";
import UserPanel from "../pages/UserPanel";
import MyOrder from "../pages/MyOrder";
import ModifyProfile from "../pages/ModifyProfile";
import TodaysOrder from "../pages/TodaysOrder";
import SalesOverview from "../pages/SalesOverview";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path:"login",
          element: <Login />
        },
        {
          path:'/register',
          element: <Register />
        },
        {
          path: '/forgot-password-req',
          element: <ForgotPassword/>
        },
        {
          path: "/reset-password",
          element: <ResetPassword /> 
        },
        {
          path:"/products",
          element: <ProductPage />,
        },
        {
          path: "/outlet", 
          element: <OutletPage/>
        },
        {
          path:'/cart',
          element: <CartPage />,
          
        },
        {
          path:'/payment',
          element: <PaymentPage />
        },
        {
          path:'/search',
          element:<SearchPage/>
        },
         {
              path:'modify-profile',
              element:<ModifyProfile/>
        }
            ,
        {
          path:'/user-panel',
          element:<UserPanel/>,
          children:[
            {
              path:'my-order',
              element: <MyOrder/>
            },
          ]
        },
        {
          path:'/admin', 
          element: <AdminPage />, 
          children:[
            {
              path: 'dashboard',
              element: <DashBoard />
            },
            {
              path:'userlist',
              element: <UserList />
            },{
              path:'product-list',
              element: <ProductList />
            },{
              path:'upload-product',
              element:<UploadProduct/>
            },{
              path:'todays-order',
              element:<TodaysOrder/>
            },{
              path:'sales-overview',
              element:<SalesOverview/>
            }
            
          ],
        }
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, 
    },
  }
);

export default router;
