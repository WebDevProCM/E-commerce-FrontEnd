import { lazy, Suspense } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './routes/Layout';
import Home from './routes/Home'
import ErrorPage from './routes/ErrorPage';
import './App.css';
import ShowingLoading from './components/ShowingLoading/ShowingLoading.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//added react lazy loading to optimize the performance
const PerfumesCategory = lazy(() => import("./routes/PerfumesCategory"));
const Cart = lazy(() => import("./routes/Cart"));
const Item = lazy(() => import("./routes/Item"));
const Login = lazy(() => import("./routes/Login"));
const Profile = lazy(() => import("./routes/Profile"));
const Orders = lazy(() => import("./routes/Orders"));
const Success = lazy(() => import("./routes/Success"))
const Cancel = lazy(() => import("./routes/Cancel"))

const Admin = lazy(() => import("./routes/Admin.jsx"));
const AdminOrders = lazy(() => import("./components/Admin/Orders/AdminOrders.jsx"));
const AdminCustomers = lazy(() => import("./components/Admin/Customers/AdminCustomers.jsx"));
const AdminReviews = lazy(() => import("./components/Admin/Reviews/AdminReviews.jsx"));
const AdminProducts = lazy(() => import("./components/Admin/Products/AdminProducts.jsx"));
const AdminLogin = lazy(() => import("./components/Admin/Login/AdminLogin.jsx"));

function App() {
  
  const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children: [
      {index: true, element: <Home/>},
      {path: "/mens", loader:({request}) => import("./routes/PerfumesCategory").then(module => module.loader({request})), 
        element:
         <Suspense fallback={<ShowingLoading/>}>
          <PerfumesCategory category='Men' bannerTitle='Trending Mens Perfume' bannerImg='mensBanner'/>
          </Suspense>, 
        errorElement: <ErrorPage />},

      {path: "/womens", loader:({request}) => import("./routes/PerfumesCategory").then(module => module.loader({request})),
        element: 
        <Suspense fallback={<ShowingLoading/>}>
        <PerfumesCategory category='Women' bannerTitle='Trending Womens Perfume' bannerImg='womensBanner'/>
        </Suspense>, 
        errorElement: <ErrorPage />},
        
      {path: "/item/:itemId", loader: ({params}) => import("./routes/Item").then(module => module.loader({params})),
        element: <Suspense fallback={<ShowingLoading/>}><Item /></Suspense>, 
        errorElement: <ErrorPage />},

      {path: "/cart", loader:() => import("./routes/Cart").then(module => module.loader()), 
        element:<Suspense fallback={<ShowingLoading/>}><Cart/></Suspense>, 
        errorElement: <ErrorPage />},

      {path: "/success", element:<Suspense fallback={<ShowingLoading/>}><Success/></Suspense>, errorElement: <ErrorPage />},

      {path: "/cancel", element:<Suspense fallback={<ShowingLoading/>}><Cancel/></Suspense>, errorElement: <ErrorPage />},

      {path: "/login", element: <Suspense fallback={<ShowingLoading/>}><Login/></Suspense>},

      {path: "/profile", element: <Suspense fallback={<ShowingLoading/>}><Profile/></Suspense>, 
        action: ({request}) => import("./components/UserProfile/UserProfile").then(module => module.action({request})), 
        loader: () => import("./routes/Profile").then(module => module.verifyAuth()), 
        errorElement: <ErrorPage />},

      {path: "/orders", element: <Suspense fallback={<ShowingLoading/>}><Orders /></Suspense>, 
        errorElement: <ErrorPage />, 
        loader: () => import("./routes/Orders.jsx").then(module => module.loader())}
    ]},
    {path: "/admin", element: <Suspense fallback={<ShowingLoading/>}><Admin /></Suspense>, 
      loader: () => import("./routes/Admin.jsx").then(module => module.loader()), 
      action: () => import("./routes/Admin.jsx").then(module => module.action()), 
      errorElement: <ErrorPage />, children: [
        
        {path: "orders", element: <Suspense fallback={<ShowingLoading/>}><AdminOrders /></Suspense>, 
          action: ({request}) => import("./components/Admin/Orders/AdminOrders.jsx").then(module => module.action({request})), 
          loader: () => import("./components/Admin/Orders/AdminOrders.jsx").then(module => module.loader()), 
          errorElement: <ErrorPage />},

        {path: "customers", element: <Suspense fallback={<ShowingLoading/>}><AdminCustomers /></Suspense> , 
          action: ({request}) => import("./components/Admin/Customers/AdminCustomers.jsx").then(module => module.action({request})), 
          loader:  () => import("./components/Admin/Customers/AdminCustomers.jsx").then(module => module.loader()), 
          errorElement: <ErrorPage />},

        {path: "reviews", element: <Suspense fallback={<ShowingLoading/>}><AdminReviews /></Suspense>, 
          action: ({request}) => import("./components/Admin/Reviews/AdminReviews.jsx").then(module => module.action({request})), 
          loader: () => import("./components/Admin/Reviews/AdminReviews.jsx").then(module => module.loader()), 
          errorElement: <ErrorPage />},

        {path: "products", element:<Suspense fallback={<ShowingLoading/>}><AdminProducts /></Suspense>, 
          action: ({request}) => import("./components/Admin/Products/AdminProducts.jsx").then(module => module.action({request})), 
          loader: () => import("./components/Admin/Products/AdminProducts.jsx").then(module => module.loader()), 
          errorElement: <ErrorPage />},
      ]},
      
    {path: "/admin/login", element:<Suspense fallback={<ShowingLoading/>}> <AdminLogin /></Suspense>, 
      action: ({request}) => import("./components/Admin/Login/AdminLogin.jsx").then(module => module.action({request})), 
      loader: () => import("./components/Admin/Login/AdminLogin.jsx").then(module => module.loader()) ,
      errorElement: <ErrorPage />},
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
