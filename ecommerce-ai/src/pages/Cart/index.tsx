
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    const handleDecrease = (id: number) => {
        const item = cart.find((item) => item.id === id);
        if (item && item.quantity > 1) {
            updateQuantity(id, item.quantity - 1);
        } else {
            removeFromCart(id);
        }
    };

    const handleIncrease = (id: number) => {
        const item = cart.find((item) => item.id === id);
        if (item) {
            updateQuantity(id, item.quantity + 1);
        }
    };

    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2 className="cart-title">Your Cart</h2>
            {cart.length === 0 ? (
                <div className="cart-empty">
                    Your cart is empty.<br />
                    <Link to="/products">Browse products</Link>
                </div>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <div className="cart-item-title">{item.name}</div>
                                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => handleDecrease(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.id)}>+</button>
                                    </div>
                                </div>
                                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)} title="Remove">×</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">Total: ${total.toFixed(2)}</div>
                    <div className="cart-actions">
                        <button onClick={clearCart}>Clear Cart</button>
                        {/* Add checkout button or logic here if needed */}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
