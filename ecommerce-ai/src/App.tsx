import './App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/index';
import Products from './pages/Products/index';
import ProductDetail from './pages/ProductDetail/index';
import Cart from './pages/Cart/index';
import Chatbot from './pages/Chatbot/index';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/chatbot">Chatbot</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
