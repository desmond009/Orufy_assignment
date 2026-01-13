import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../services/api';
import styles from './AddProductModal.module.css';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
    const [formData, setFormData] = useState({
        name: product.name || '',
        type: product.type || '',
        stock: product.stock || '',
        mrp: product.mrp || '',
        sellingPrice: product.sellingPrice || '',
        brand: product.brand || '',
        exchangeEligible: product.exchangeEligible ? 'Yes' : 'No',
        isPublished: product.isPublished ? 'true' : 'false',
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            await api.put(`/products/${product._id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onProductUpdated();
            onClose();
        } catch (error) {
            console.error(error);
            alert('Failed to update product');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Product</div>
                    <button className={styles.closeBtn} onClick={onClose}><FiX /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Product Name</label>
                        <input name="name" value={formData.name} className={styles.input} onChange={handleChange} required placeholder="e.g. CakeZone Walnut Brownie" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Product Type</label>
                        <select name="type" value={formData.type} className={styles.select} onChange={handleChange} required>
                            <option value="">Select product type</option>
                            <option value="Foods">Foods</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Beauty">Beauty Products</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Quantity Stock</label>
                        <input name="stock" value={formData.stock} type="number" className={styles.input} onChange={handleChange} required placeholder="Total numbers of Stock available" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>MRP</label>
                        <input name="mrp" value={formData.mrp} type="number" className={styles.input} onChange={handleChange} required placeholder="Maximum Retail Price" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Selling Price</label>
                        <input name="sellingPrice" value={formData.sellingPrice} type="number" className={styles.input} onChange={handleChange} required placeholder="Selling Price" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Brand Name</label>
                        <input name="brand" value={formData.brand} className={styles.input} onChange={handleChange} required placeholder="Brand Name" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Upload Additional Product Images</label>
                        <div className={styles.fileUpload} onClick={() => document.getElementById('editFileInput').click()}>
                            Choose files <br /> <strong>Browse</strong>
                            <input id="editFileInput" type="file" multiple hidden onChange={handleFileChange} accept="image/*" />
                        </div>
                        {images.length > 0 && <small>{images.length} file(s) selected</small>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Exchange or return eligibility</label>
                        <select name="exchangeEligible" value={formData.exchangeEligible} className={styles.select} onChange={handleChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Published Status</label>
                        <select name="isPublished" value={formData.isPublished} className={styles.select} onChange={handleChange}>
                            <option value="true">Published</option>
                            <option value="false">Unpublished</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
