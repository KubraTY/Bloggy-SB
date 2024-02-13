import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BlogContext } from '../context/BlogContext';

const NewBlogPost = () => {
    const { categories, createPost } = useContext(BlogContext); // Extracting categories from the context
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category_id", categoryId); // Use categoryId state
        formData.append("image", image);

        try {
            await createPost({ title, content, categoryId, image }); // Use createPost function from context

            // Clear form fields after successful post creation
            setTitle('');
            setContent('');
            setCategoryId('');
            setImage(null);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };
    

    return (
        <div>
            <h2>Create a New Blog Post</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewBlogPost;
