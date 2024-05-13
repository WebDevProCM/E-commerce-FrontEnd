import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar'
import Home from './pages/home'
import Mens from './pages/mens'
import Womens from './pages/womens'
import Cart from './pages/cart'
import Item from './pages/item'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/mens' element={<Mens/>}></Route>
        <Route path='/womens' element={<Womens/>}></Route>
        <Route path='/item' element={<Item/>}></Route>
          <Route path=':itemId' element={<Item/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
