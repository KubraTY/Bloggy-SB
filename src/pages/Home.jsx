import React, { useContext, useEffect, useState } from 'react';
import NewBlogPost from '../components/NewBlogPost';
import BlogCard from '../components/BlogCard';
import { BlogContext } from '../context/BlogContext';
import axios from "axios";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [visible, setVisible] = useState(4);
    const [loading, setLoading] = useState(false)
    const perPageCount = 8;
  
    const showMoreItems = () => {
      setVisible((preValue) => preValue + 4);
    };
  
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await axios.get(
          `https://frontend-case-api.sbdev.nl/api/posts?page=${
            visible / 4
          }&perPage=4&sortBy=title&sortDirection=asc&searchPhrase=test%20ber&categoryId=1`,
          {
            headers: {
              token: "pj11daaQRz7zUIH56B9Z",
            },
          }
        );
        const sortedPosts = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs((prevState) => [...prevState, ...sortedPosts]);
      };
      if (visible % 4 === 0) {
        setLoading(true);
        fetchPosts().finally(() => setLoading(false));
      };
    }, [visible]);

    return (
        <>
            <p>Home Page</p>
            <div>
                <NewBlogPost />
                <ul>
                    {blogs.slice(0,visible).map(post => (
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
