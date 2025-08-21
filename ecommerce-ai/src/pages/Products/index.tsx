
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';
import './Products.scss';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

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

    const [searching, setSearching] = useState(false);
    const { addToCart } = useCart();
    const [addingId, setAddingId] = useState<number | null>(null);

    const handleSearch = async () => {
        if (!search.trim()) return;
        setSearching(true);
        setError(null);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setProducts(data);
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'message' in err) {
                setError((err as { message: string }).message || 'Search failed');
            } else {
                setError('Search failed');
            }
        } finally {
            setSearching(false);
        }
    };

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Products</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                    disabled={searching}
                />
                <button
                    onClick={handleSearch}
                    disabled={!search.trim() || searching}
                >
                    {searching ? 'Searching...' : 'Search'}
                </button>
            </div>
            <div className="products-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>${product.price.toFixed(2)}</strong></p>
                        <div className="product-actions">
                            <Link to={`/products/${product.id}`}>View Details</Link>
                            <button
                                className="add-action"
                                onClick={() => {
                                    setAddingId(product.id);
                                    addToCart(product);
                                    setTimeout(() => setAddingId(null), 700);
                                }}
                                disabled={addingId === product.id}
                            >
                                {addingId === product.id ? 'Adding…' : 'Add'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
