import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [visible, setVisible] = useState(4);
   // const [url, setUrl] = useState('https://frontend-case-api.sbdev.nl/api/posts?page=');
    const [pageLinks, setPageLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
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

    useEffect(() => {
        fetchBlogPosts();
        console.log(blogPosts)
    }, [ currentPage]);

    const createPost = async (postData) => {
        try {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("content", postData.content);
            formData.append("category_id", postData.categoryId);
            formData.append("image", postData.image);

            const response = await axios.post('https://frontend-case-api.sbdev.nl/api/posts', formData, {
                headers: {
                    token: 'pj11daaQRz7zUIH56B9Z',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Post created:', response.data);
        } catch (error) {
            console.error('Error creating post:', error);
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
    

    return (
        <BlogContext.Provider
            value={{
                blogPosts,
                fetchBlogPosts,
                createPost,
                handlePageChange,
                currentPage,
                lastPage
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
