import React, { useEffect, useState, useContext } from 'react';
import NewBlogPost from '../components/NewBlogPost';
import BlogList from '../components/BlogList';
import { BlogContext } from '../context/BlogContext';
import styles from '../styles/home.module.css';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const { fetchLatestPosts, blogs } = useContext(BlogContext);
    const [visible, setVisible] = useState(4);
    const [loading, setLoading] = useState(false);
    const perPageCount = 4;
    const location = useLocation();

    useEffect(() => {
        fetchLatestPosts(1, true);
    }, [location.pathname]);

    const fetchLatestData = async (visible) => {
        try {
            setLoading(true);
            const nextPage = Math.ceil(visible / perPageCount) + 1;
            await fetchLatestPosts(nextPage);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showMoreItems = () => {
        fetchLatestData(visible);
        setVisible(prevVisible => prevVisible + perPageCount);
    };

    return (
        <>
            <div className={styles.homeContainer}>
                <NewBlogPost />
                <BlogList
                    blogs={blogs}
                    visible={visible}
                    loading={loading}
                    showMoreItems={showMoreItems}
                />
            </div>
        </>
    );
};

export default Home;
