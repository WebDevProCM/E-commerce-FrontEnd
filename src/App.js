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
