import React, { useEffect, useState } from 'react';
import NewBlogPost from '../components/NewBlogPost';
import BlogCard from '../components/BlogCard';
import axios from "axios";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [visible, setVisible] = useState(4);
    const [loading, setLoading] = useState(false);
    const perPageCount = 4;
  
    const showMoreItems = () => {
        setVisible(prevVisible => prevVisible + 4);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://frontend-case-api.sbdev.nl/api/posts?page=${visible / 4}&perPage=${perPageCount}&sortBy=created_at&sortDirection=desc`,
                    {
                        headers: {
                            token: "pj11daaQRz7zUIH56B9Z",
                        },
                    }
                );
                setBlogs(prevBlogs => [...prevBlogs, ...response.data.data]);
                console.log(blogs)
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (visible % 4 === 0) {
            fetchPosts();
        }
    }, [visible]);

    return (
        <>
            <p>Home Page</p>
            <div>
                <NewBlogPost />
                <ul>
                    {blogs.slice(0, visible).map(post => (
                        <li key={post.id}>
                            <BlogCard post={post} />
                        </li>
                    ))}
                </ul>
                <button onClick={showMoreItems} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </>
    );
};

export default Home;
