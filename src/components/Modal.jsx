import React from 'react';
import styles from '../styles/modal.module.css';

const Modal = ({ post, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <div className={styles.imageContainer}>
                <img  src={`https://frontend-case-api.sbdev.nl/storage/${post.img_url}`} alt={post.title} />
                </div>
                <h2 className={styles.title}>{post.title.toUpperCase()}</h2>
                <p className={styles.content}>{post.content}</p>
            </div>
        </div>
    );
};

export default Modal;
