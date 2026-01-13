import React, { useState, useEffect } from 'react';
import { FiGrid, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../services/api';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            // Fetch all products
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleDelete = async (productId, productName) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            try {
                await api.delete(`/products/${productId}`);
                fetchProducts();
            } catch (error) {
                console.error(error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div>
            {/* Header Action if products exist */}
            {products.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: '#0044CC',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FiPlus /> Add Product
                    </button>
                </div>
            )}

            {products.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                    color: '#2C3E50'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1B2131' }}>
                        <FiGrid />
                        <span style={{ fontSize: '1.5rem', verticalAlign: 'super', marginLeft: '-10px' }}>+</span>
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Feels a little empty over here...</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center', maxWidth: '300px', marginBottom: '2rem' }}>
                        You can create products without connecting store so you can add products to store anytime.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: '#0044CC', // Blue from screenshot
                            color: 'white',
                            border: 'none',
                            padding: '0.8rem 2rem',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Add your Products
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {products.map(p => (
                        <div key={p._id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
                            <img
                                src={p.images[0] ? `http://localhost:5000${p.images[0]}` : 'https://via.placeholder.com/150'}
                                alt={p.name}
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    background: '#f0f0f0'
                                }}
                            />
                            <h4 style={{ marginTop: '1rem', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                            <p style={{ color: '#888', fontSize: '0.8rem' }}>{p.type}</p>
                            <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>${p.sellingPrice}</div>

                            {/* Action buttons */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button
                                    onClick={() => handleEdit(p)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        background: '#0044CC',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.3rem',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <FiEdit2 size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p._id, p.name)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        background: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.3rem',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <FiTrash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <AddProductModal
                    onClose={() => setShowModal(false)}
                    onProductAdded={() => {
                        fetchProducts();
                        // Optional: Close modal or keep based on UX? Usually keep closed.
                    }}
                />
            )}

            {showEditModal && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedProduct(null);
                    }}
                    onProductUpdated={() => {
                        fetchProducts();
                    }}
                />
            )}
        </div>
    );
};

export default Products;
