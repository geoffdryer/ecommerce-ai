
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function Products() {
  return <h2>Products</h2>;
}

function ProductDetail() {
  return <h2>Product Detail</h2>;
}

function Cart() {
  return <h2>Cart</h2>;
}

function Chatbot() {
  return <h2>Chatbot</h2>;
}

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
