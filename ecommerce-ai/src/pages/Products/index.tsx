
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.scss';

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

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
