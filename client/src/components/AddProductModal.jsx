import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../services/api';
import styles from './AddProductModal.module.css';

const AddProductModal = ({ onClose, onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        stock: '',
        mrp: '',
        sellingPrice: '',
        brand: '',
        exchangeEligible: 'Yes', // Default
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
        // Default published to true for now as per Figma 'published product'
        data.append('isPublished', 'true');

        try {
            await api.post('/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onProductAdded();
            onClose();
        } catch (error) {
            console.error(error);
            alert('Failed to create product');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>Add Product</div>
                    <button className={styles.closeBtn} onClick={onClose}><FiX /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Product Name</label>
                        <input name="name" className={styles.input} onChange={handleChange} required placeholder="e.g. CakeZone Walnut Brownie" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Product Type</label>
                        <select name="type" className={styles.select} onChange={handleChange} required>
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
                        <input name="stock" type="number" className={styles.input} onChange={handleChange} required placeholder="Total numbers of Stock available" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>MRP</label>
                        <input name="mrp" type="number" className={styles.input} onChange={handleChange} required placeholder="Total numbers of Stock available" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Selling Price</label>
                        <input name="sellingPrice" type="number" className={styles.input} onChange={handleChange} required placeholder="Total numbers of Stock available" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Brand Name</label>
                        <input name="brand" className={styles.input} onChange={handleChange} required placeholder="Total numbers of Stock available" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Upload Product Images</label>
                        <div className={styles.fileUpload} onClick={() => document.getElementById('fileInput').click()}>
                            Enter Description <br /> <strong>Browse</strong>
                            <input id="fileInput" type="file" multiple hidden onChange={handleFileChange} accept="image/*" />
                        </div>
                        {images.length > 0 && <small>{images.length} file(s) selected</small>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Exchange or return eligibility</label>
                        <select name="exchangeEligible" className={styles.select} onChange={handleChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Create</button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
