import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './routes/Layout';
import Home from './routes/Home'
import PerfumesCategory, {loader as perfumesLoader} from './routes/PerfumesCategory'
import Cart, {loader as cartLoader} from './routes/Cart'
import Item, {loader as itemLoader} from './routes/Item'
import Login from './routes/Login'
import ErrorPage from './routes/ErrorPage';
import Profile from './routes/Profile';
import {action as profileAction} from './components/UserProfile/UserProfile';
import { verifyAuth } from './routes/Profile';
import Orders from './routes/Orders.jsx';
import { loader as loadOrders } from './routes/Orders.jsx';
import Admin, { action as adminLogoutAction, loader as verifyAuthAdmin } from './routes/Admin.jsx';
import AdminOrders, { loader as adminOrdLoader } from './components/Admin/Orders/AdminOrders.jsx';
import { action as adminOrdAction } from './components/Admin/Orders/AdminOrders.jsx';
import AdminCustomers, { action as adminCusAction, loader as adminCusLoader } from './components/Admin/Customers/AdminCustomers.jsx';
import AdminReviews, { action as adminRevAction, loader as adminRevLoader } from './components/Admin/Reviews/AdminReviews.jsx';
import AdminLogin, { action as adminLoginAction, loader as adminLoginLoader } from './components/Admin/Login/AdminLogin.jsx';
import AdminProducts, { action as adminProductsAction, loader as adminProductsLoader } from './components/Admin/Products/AdminProducts.jsx';

function App() {
  
  const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children: [
      {index: true, element: <Home/>},
      {path: "/mens", loader:perfumesLoader, element: <PerfumesCategory 
        category='Men' bannerTitle='Trending Mens Perfume' bannerImg='mensBanner'/>, 
        errorElement: <ErrorPage />},

      {path: "/womens", loader:perfumesLoader, element: <PerfumesCategory 
        category='Women' bannerTitle='Trending Womens Perfume' bannerImg='womensBanner'/>, 
        errorElement: <ErrorPage />},
        
      {path: "/item/:itemId", loader: itemLoader ,element: <Item />, errorElement: <ErrorPage />},
      {path: "/cart", loader:cartLoader, element: <Cart/>, errorElement: <ErrorPage />},
      {path: "/login", element: <Login/>},
      {path: "/profile", element: <Profile/>, action: profileAction, loader: verifyAuth, errorElement: <ErrorPage />},
      {path: "/orders", element: <Orders />, errorElement: <ErrorPage />, loader: loadOrders}
    ]},
    {path: "/admin", element: <Admin />, loader: verifyAuthAdmin, action: adminLogoutAction, errorElement: <ErrorPage />, children: [
      {path: "orders", element: <AdminOrders />, action: adminOrdAction, loader: adminOrdLoader, errorElement: <ErrorPage />},
      {path: "customers", element: <AdminCustomers />, action: adminCusAction, loader: adminCusLoader, errorElement: <ErrorPage />},
      {path: "reviews", element: <AdminReviews />, action: adminRevAction, loader: adminRevLoader, errorElement: <ErrorPage />},
      {path: "products", element: <AdminProducts />, action: adminProductsAction, loader: adminProductsLoader, errorElement: <ErrorPage />},
    ]},
    {path: "/admin/login", element: <AdminLogin />, action: adminLoginAction, loader: adminLoginLoader ,errorElement: <ErrorPage />},
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
