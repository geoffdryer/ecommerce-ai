import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Products from './pages/Products/index';
import ProductDetail from './pages/ProductDetail/index';
import Cart from './pages/Cart/index';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Chatbot from './components/Chatbot/Chatbot';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
