
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {products.map((product) => (
                    <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 220 }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 4 }} />
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
