import { products } from '../../data/products';
import { Link } from 'react-router-dom';
import './Products.scss';

const Products = () => {
    return (
        <div>
            <h2>Products</h2>
            <div className="products-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>${product.price.toFixed(2)}</strong></p>
                        <Link to={`/products/${product.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
