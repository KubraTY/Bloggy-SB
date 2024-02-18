import React, { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import styles from '../styles/blogList.module.css';
import '../App.css';
import { useLocation } from 'react-router-dom';

const BlogList = ({ blogs, visible, loading, showMoreItems }) => {
    const location = useLocation();

    useEffect(() => {
        //console.log('Location pathname changed:', location.pathname);
    }, [location.pathname]);

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
