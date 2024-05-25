import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './routes/Layout';
import Home from './routes/home'
import PerfumesCategory, {loader as perfumesLoader} from './routes/PerfumesCategory'
import Cart, {loader as cartLoader} from './routes/cart'
import Item, {loader as itemLoader} from './routes/item'
import Login from './routes/login'
import ErrorPage from './routes/errorPage';
import Profile from './routes/profile';
import {action as profileAction} from './components/userProfile/UserProfile';

function App() {
  
  const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children: [
      {path: "/", element: <Home/>},
      {path: "/mens", loader:perfumesLoader, element: <PerfumesCategory 
        category='Men' bannerTitle='Trending Mens Perfume' bannerImg='mensBanner'/>, 
        errorElement: <ErrorPage />},

      {path: "/womens", loader:perfumesLoader, element: <PerfumesCategory 
        category='Women' bannerTitle='Trending Womens Perfume' bannerImg='womensBanner'/>, 
        errorElement: <ErrorPage />},
        
      {path: "/item/:itemId", loader: itemLoader ,element: <Item />, errorElement: <ErrorPage />},
      {path: "/cart", loader:cartLoader, element: <Cart/>, errorElement: <ErrorPage />},
      {path: "/login", element: <Login/>},
      {path: "/profile", element: <Profile/>, action: profileAction, errorElement: <ErrorPage />}
    ]}
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
