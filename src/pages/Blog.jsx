import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import styles from '../styles/blog.module.css'

const Blog = () => {
    const { blogPosts, fetchBlogPosts, handlePageChange, currentPage, lastPage } = useContext(BlogContext);
    const [loading, setLoading] = useState(true);
    const [isFetchingData, setIsFetchingData] = useState(false); 

    const postsPerPage = 8;

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
    }, [currentPage]); 

    const renderBlogPosts = () => {
        return (
            <ul>
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
                    <span key={index} className="pagination-separator">
                        ...
                    </span>
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
            <p>Blog Page</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {renderBlogPosts()}
                    <div className={styles.pagination}>
    <button onClick={() => !isFetchingData && handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
    {generatePagination()}
    <button onClick={() => !isFetchingData && handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}>Next</button>
</div>

                </>
            )}
        </>
    );
};

export default Blog;
