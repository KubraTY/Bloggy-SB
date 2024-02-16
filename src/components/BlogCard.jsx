import React, { useEffect, useState } from 'react';
import styles from '../styles/blogCard.module.css';

const BlogCard = ({ post }) => {
    console.log(post)

    const [date, setDate] = useState("");
    useEffect(() => {
        const date2 = new Date(post.created_at);
        setDate(`${date2.getMonth()}-${date2.getDay()}-${date2.getFullYear()}`);
    }, [post.created_at]);

    return (
        <article className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img src={`https://frontend-case-api.sbdev.nl/storage/${post.img_url}`} alt={post.title} />
                <div className={styles.date}>{date}</div>
                <div className={styles.categoryName}>{post.category.name}</div>
            </div>
            <div className={styles.postContent}>
                <h2 className={styles.title}>{post.title.toUpperCase()}</h2>
                <p className={styles.postContent}>{post.content}</p>
            </div>
        </article>
    )

}

export default BlogCard