import './App.css';
import Navbar from './components/navbar/navbar'
import Banner from './components/banner/banner'
import NewArrival from './components/newArrival/newArrival'
import MenSection from './components/menSection/mensection'
import WomenSection from './components/womenSection/womensection';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <NewArrival/>
      <MenSection/>
      <WomenSection/>
      <Footer/>
    </div>
  );
}

export default App;
