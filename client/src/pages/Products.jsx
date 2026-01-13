import React, { useState, useEffect } from 'react';
import { FiGrid, FiPlus, FiEdit2, FiTrash2, FiCopy } from 'react-icons/fi';
import api from '../services/api';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';
import styles from './Products.module.css';

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

    const togglePublish = async (product) => {
        try {
            const formData = new FormData();
            formData.append('isPublished', !product.isPublished);

            await api.put(`/products/${product._id}`, formData);
            fetchProducts();
        } catch (error) {
            console.error(error);
            alert('Failed to update product status');
        }
    };

    return (
        <div className={styles.productsContainer}>
            {/* Header Action if products exist */}
            {products.length > 0 && (
                <div className={styles.header}>
                    <h2 className={styles.title}>Products</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className={styles.addButton}
                    >
                        <FiPlus /> Add Products
                    </button>
                </div>
            )}

            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <FiGrid />
                        <span style={{ fontSize: '1.5rem', verticalAlign: 'super', marginLeft: '-10px' }}>+</span>
                    </div>
                    <h3 className={styles.emptyTitle}>Feels a little empty over here...</h3>
                    <p className={styles.emptyDescription}>
                        You can create products without connecting store so you can add products to store anytime.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className={styles.addButton}
                    >
                        Add your Products
                    </button>
                </div>
            ) : (
                <div className={styles.productsGrid}>
                    {products.map(p => (
                        <div key={p._id} className={styles.productCard}>
                            <img
                                src={p.images[0] ? `http://localhost:5000${p.images[0]}` : 'https://via.placeholder.com/300x180'}
                                alt={p.name}
                                className={styles.productImage}
                            />
                            <div className={styles.productContent}>
                                <h4 className={styles.productName}>{p.name}</h4>

                                <div className={styles.productDetails}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Product type -</span>
                                        <span className={styles.detailValue}>{p.type}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Quantity Stock -</span>
                                        <span className={styles.detailValue}>{p.stock}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>MRP -</span>
                                        <span className={styles.detailValue}>₹ {p.mrp}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Selling Price -</span>
                                        <span className={styles.detailValue}>₹ {p.sellingPrice}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Brand Name -</span>
                                        <span className={styles.detailValue}>{p.brand}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Total Number of images -</span>
                                        <span className={styles.detailValue}>{p.images?.length || 0}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Exchange Eligibility -</span>
                                        <span className={styles.detailValue}>{p.exchangeEligible ? 'YES' : 'NO'}</span>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className={styles.productActions}>
                                    <button
                                        onClick={() => togglePublish(p)}
                                        className={`${styles.actionButton} ${p.isPublished ? styles.unpublishButton : styles.publishButton}`}
                                    >
                                        {p.isPublished ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className={`${styles.actionButton} ${styles.editButton}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id, p.name)}
                                        className={`${styles.actionButton} ${styles.iconButton} ${styles.deleteButton}`}
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
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
