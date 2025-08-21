import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';
import './ProductDetail.scss';

const ProductDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`/api/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Product not found');
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !product) {
        return (
            <div>
                <h2>Product Not Found</h2>
                <Link to="/products">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} className="product-detail-image" />
            <p className="product-description">{product.description}</p>
            <p className="product-price">${Number(product.price).toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
            <br />
            <Link to="/products">Back to Products</Link>&nbsp;|&nbsp;
            <Link to="/cart">Go to Cart</Link>
        </div>
    );
};

export default ProductDetail;
