import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [pageLinks, setPageLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [perPageCount, setPerPageCount] = useState(4); 
    const [blogs, setBlogs] = useState([]);
    const TOKEN = 'pj11daaQRz7zUIH56B9Z';

    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get(`https://frontend-case-api.sbdev.nl/api/posts?page=${currentPage}&perPage=8`, {
                headers: {
                    token: TOKEN
                }
            });
            const data = response.data;
            setBlogPosts(data.data);
            setPageLinks(data.links);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error('There is an error', error);
        }
    };

    const fetchLatestPosts = async (page, firstCall=false) => {
        try {
            const response = await axios.get(
                `https://frontend-case-api.sbdev.nl/api/posts?page=${page}&perPage=${perPageCount}&sortBy=created_at&sortDirection=desc`,
                {
                    headers: {
                        token: TOKEN,
                    },
                }
            );
            //setBlogs(prevBlogs => [...prevBlogs, ...response.data.data]);
            const newPosts = response.data.data.filter(post => !blogs.find(existingPost => existingPost.id === post.id));
            setBlogs(prevBlogs => firstCall ? newPosts : [...prevBlogs, ...newPosts])
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const createPost = async (postData) => {
        try {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("content", postData.content);
            formData.append("category_id", postData.categoryId);
            formData.append("image", postData.image);
    
            const response = await axios.post('https://frontend-case-api.sbdev.nl/api/posts', formData, {
                headers: {
                    token: TOKEN,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 201) { 
                console.log('Post created:', response.data);
                fetchLatestPosts()
            } else {
                console.error("Error creating post:", response.statusText);
                fetchLatestPosts()
            }
        } catch (error) {
            console.error('Error creating postt:', error);
        }
    };
    

    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber);
        try {
            const response = await axios.get(`https://frontend-case-api.sbdev.nl/api/posts?page=${pageNumber}&perPage=8`, {
                headers: {
                    token: TOKEN
                }
            });
            const data = response.data;
            setBlogPosts(data.data);
            setPageLinks(data.links);
            setLastPage(data.last_page);
        } catch (error) {
            console.error('There is an error', error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get('https://frontend-case-api.sbdev.nl/api/categories', {
                headers: {
                    token: TOKEN
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    
    useEffect(() => {
        fetchBlogPosts(currentPage, perPageCount);
        getCategories();
    }, [currentPage, perPageCount]);

    return (
        <BlogContext.Provider
            value={{
                blogPosts,
                fetchBlogPosts,
                createPost,
                handlePageChange,
                currentPage,
                lastPage,
                categories,
                setCurrentPage,
                perPageCount,
                setPerPageCount,
                fetchLatestPosts,
                blogs
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
