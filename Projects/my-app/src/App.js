import './App.css';
import Navbar from './Component/navbar/navbar';
import Main from './Component/Main-content/Main_content';
import { Routes, Route } from 'react-router-dom';
import Product from './Component/product/product';
import Footer from './Component/footer/footer';
import Cart from './Component/cart/cart';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
      <Route path='/' element={ <Main/>}/>
      <Route path='/Product' element={ <Product/> }/>
      <Route path='/cart' element={ <Cart/> }/>
     </Routes>
     <Footer/>
    
    </div>
  )
}

export default App
