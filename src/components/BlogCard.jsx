import React, { useState, useEffect } from 'react';
import styles from '../styles/blogCard.module.css';
import Modal from './Modal'; 

const BlogCard = ({ post }) => {
    const [date, setDate] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const date2 = new Date(post.created_at);
        setDate(`${date2.getMonth()}-${date2.getDay()}-${date2.getFullYear()}`);
    }, [post.created_at]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <article className={styles.cardContainer} onClick={toggleModal}>
            <div className={styles.imageContainer}>
                <img src={`https://frontend-case-api.sbdev.nl/storage/${post.img_url}`} alt={post.title} />
                <div className={styles.date}>{date}</div>
                <div className={styles.categoryName}>{post.category.name}</div>
            </div>
            <div className={styles.postContent}>
                <h2 className={styles.title}>{post.title.toUpperCase()}</h2>
                <p>
                    {post.content.slice(0, 166) + "..."}
                </p>
            </div>
            {showModal && (
                <Modal post={post} onClose={toggleModal} />
            )}
        </article>
    );
}

export default BlogCard;
