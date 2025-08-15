import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import './ProductDetail.scss';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
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
            <p>{product.description}</p>
            <p><strong>${product.price.toFixed(2)}</strong></p>
            <Link to="/products">Back to Products</Link>
        </div>
    );
};

export default ProductDetail;
