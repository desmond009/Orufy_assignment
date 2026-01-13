import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FiGrid } from 'react-icons/fi'; // Approx icon

const Home = () => {
    const [activeTab, setActiveTab] = useState('published');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            // Implementation for fetching
            try {
                const { data } = await api.get(`/products?isPublished=${activeTab === 'published'}`);
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [activeTab]);

    return (
        <div>
            <div style={{
                display: 'flex',
                gap: '2rem',
                borderBottom: '1px solid #eee',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                fontWeight: '500'
            }}>
                <div
                    onClick={() => setActiveTab('published')}
                    style={{
                        paddingBottom: '0.5rem',
                        cursor: 'pointer',
                        color: activeTab === 'published' ? '#2C3E50' : '#888',
                        borderBottom: activeTab === 'published' ? '2px solid #2C3E50' : 'none'
                    }}
                >
                    Published
                </div>
                <div
                    onClick={() => setActiveTab('unpublished')}
                    style={{
                        paddingBottom: '0.5rem',
                        cursor: 'pointer',
                        color: activeTab === 'unpublished' ? '#2C3E50' : '#888',
                        borderBottom: activeTab === 'unpublished' ? '2px solid #2C3E50' : 'none'
                    }}
                >
                    Unpublished
                </div>
            </div>

            {/* Content */}
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
                    <h3 style={{ marginBottom: '0.5rem' }}>No {activeTab === 'published' ? 'Published' : 'Unpublished'} Products</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center', maxWidth: '300px' }}>
                        Your {activeTab === 'published' ? 'Published' : 'Unpublished'} Products will appear here.
                        Create your first product to publish.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {products.map(p => (
                        <div key={p._id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <img src={p.images[0] ? `http://localhost:5000${p.images[0]}` : 'https://via.placeholder.com/150'} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                            <h4 style={{ marginTop: '1rem', fontSize: '1rem' }}>{p.name}</h4>
                            <p style={{ color: '#888', fontSize: '0.8rem' }}>{p.brand}</p>
                            <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>${p.sellingPrice}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
