import React, { useContext, useEffect, useState } from 'react';
import NewBlogPost from '../components/NewBlogPost';
import BlogCard from '../components/BlogCard';
import { BlogContext } from '../context/BlogContext';

const Home = () => {
    const postsToShowInitially = 4;
    const postsPerLoad = 4;
    const { blogPosts, fetchBlogPosts, currentPage, lastPage } = useContext(BlogContext);
    const [loading, setLoading] = useState(false);
    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        if(blogPosts.length > 0){
            const sortedPosts = blogPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setLatestPosts(sortedPosts.slice(0, postsToShowInitially));
        }
    }, [blogPosts]);

    const loadMorePosts = () => {
        const nextPosts = blogPosts.slice(latestPosts.length, latestPosts.length + postsPerLoad);
        setLatestPosts(prevPosts => [...prevPosts, ...nextPosts]);
      };

    return (
        <>
            <p>Home Page</p>
            <div>
                <NewBlogPost />
                <ul>
                    {latestPosts.map(post => (
                        <li key={post.id}>
                            <BlogCard post={post} />
                        </li>
                    ))}
                </ul>
                {latestPosts.length < blogPosts.length && (
                    <button onClick={loadMorePosts} disabled={loading}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
        </>
    );
};

export default Home;
