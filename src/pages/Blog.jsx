import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import styles from '../styles/blog.module.css';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { HiArrowLongRight, HiArrowLongLeft} from "react-icons/hi2";


const Blog = () => {
    const { blogPosts, fetchBlogPosts, handlePageChange, currentPage, lastPage, perPageCount } = useContext(BlogContext);
    const [loading, setLoading] = useState(true);
    const [isFetchingData, setIsFetchingData] = useState(false); 

    const fetchData = async () => {
        try {
            setIsFetchingData(true); 
            await fetchBlogPosts();
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setIsFetchingData(false); 
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, perPageCount]); 

    const renderBlogPosts = () => {
        return (
            <ul className={styles.blogPosts}>
                {blogPosts.map(post => (
                    <li key={post.id}>
                        <BlogCard post={post} />
                    </li>
                ))}
            </ul>
        );
    };

    const generatePagination = () => {
        const totalButtons = 5;
        const buttons = [];
        let startPage = 1;
        let endPage = lastPage;
    
        if (lastPage > totalButtons) {
            startPage = Math.max(currentPage - 2, 1);
            endPage = Math.min(startPage + totalButtons - 1, lastPage);
            if (endPage === lastPage) {
                startPage = lastPage - (totalButtons - 1);
            } else if (startPage === 1) {
                endPage = totalButtons;
            }
        }
    
        if (startPage > 1) {
            buttons.push(1);
        }
    
        if (startPage > 2) {
            buttons.push('...');
        }
    
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }
    
        if (endPage < lastPage - 1) {
            buttons.push('...');
        }
    
        if (endPage < lastPage) {
            buttons.push(lastPage);
        }
    
        return buttons.map((button, index) => {
            if (button === '...') {
                return (
                    <div key={index} className={styles.paginationSeparator}>
                        <span>...</span> 
                    </div>
                );
            } else {
                return (
                    <button
                        key={index}
                        className={`${styles.paginationButton} ${button === currentPage ? styles.activePage : ''}`}
                        onClick={() => !isFetchingData && handlePageChange(button)}
                        disabled={isFetchingData}
                    >
                        {button}
                    </button>
                );
            }
        });
    };
    
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {renderBlogPosts()}
                    <div className={styles.pagination}>
                        <button className={styles.prev} onClick={() => !isFetchingData && handlePageChange(currentPage - 1)} disabled={currentPage === 1}> <HiArrowLongLeft /> Vorige pagina </button>
                        {generatePagination()}
                        <button className={styles.next} onClick={() => !isFetchingData && handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}> Volgende pagina <HiArrowLongRight /> </button>
                    </div>
                </>
            )}
        </>
    );
};

export default Blog;
