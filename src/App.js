import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './routes/Layout';
import Home from './routes/home'
import PerfumesCategory, {loader as perfumesLoader} from './routes/PerfumesCategory'
// import Womens from './routes/womens'
import Cart, {loader as cartLoader} from './routes/cart'
import Item, {loader as itemLoader} from './routes/item'
import Login from './routes/login'

function App() {

  const router = createBrowserRouter([
    {path: "/", element: <RootLayout/>, children: [
      {path: "/", element: <Home/>},
      {path: "/mens", loader:perfumesLoader, element: <PerfumesCategory category='Men' bannerTitle='Trending Mens Perfume' bannerImg='mensBanner'/>},
      {path: "/womens", loader:perfumesLoader, element: <PerfumesCategory category='Women' bannerTitle='Trending Womens Perfume' bannerImg='womensBanner'/>},
      {path: "/item/:itemId", loader: itemLoader ,element: <Item />},
      {path: "/cart", loader:cartLoader, element: <Cart/>},
      {path: "/login", element: <Login/>}
    ]}
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

// {/* <BrowserRouter>
// <Navbar></Navbar>
// <Routes>
//   <Route path='/' element={<Home/>}></Route>
//   <Route path='/mens' element={<Mens/>}></Route>
//   <Route path='/womens' element={<Womens/>}></Route>
//   <Route path='/item/:itemId' element={<Item/>}></Route>
//     {/* <Route path='item/:itemId' element={<Item/>}></Route> */}
//   <Route path='/cart' element={<Cart/>}></Route>
//   <Route path='/login' element={<Login/>}></Route>
// </Routes>
// <Footer></Footer>
// </BrowserRouter> */}
