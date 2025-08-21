import { Link } from 'react-router-dom';
import './Header.scss';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cart } = useCart();
    const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

    return (
        <header className="app-header">
            <div className="header-inner">
                <Link to="/" className="brand">Smart Shop</Link>
                <nav className="header-nav">
                    <Link to="/products">Products</Link>
                    <Link to="/cart" className="cart-link">Cart{itemCount > 0 && <span className="cart-badge">{itemCount}</span>}</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
