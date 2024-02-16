import React from 'react';
import BlogCard from '../components/BlogCard';
import styles from '../styles/blogList.module.css';
import '../App.css';

const BlogList = ({ blogs, visible, loading, showMoreItems }) => {
    return (
        <div className={styles.blogList}>
            <ul className={styles.listContainer}>
                {blogs.slice(0, visible).map(post => (
                    <li key={post.id}>
                        <BlogCard post={post} />
                    </li>
                ))}
            </ul>
            <button className="mainBtn1" onClick={showMoreItems} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
            </button>
        </div>
    );
};

export default BlogList;
