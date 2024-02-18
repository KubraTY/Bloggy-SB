import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BlogContext } from '../context/BlogContext';
import { IoCameraOutline } from "react-icons/io5";
import styles from '../styles/newBlogPost.module.css';

const NewBlogPost = () => {
    const { categories, createPost } = useContext(BlogContext); 
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
        formData.append("category_id", categoryId); 
        formData.append("image", image);

        try {
            await createPost({ title, content, categoryId, image }); 
            setTitle('');
            setContent('');
            setCategoryId('');
            setImage(null);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };
    

    return (
        <div className={styles.formContainer}>
            <h2>Plaats een blog bericht</h2>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                
                <label>Berichtnaam</label>
                <input type="text" placeholder="Geen titel" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Categorie</label>
                <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="" disabled>Geen categorie</option>
                    {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                </select>
                <label>Header afbeelding</label>
                <div className={styles.uploadField}>
                <IoCameraOutline className={styles.cameraIcon} />
                    <input type="file" id="image"   hidden required  onChange={(e) => setImage(e.target.files[0])}/>
                    <label htmlFor="image" className={styles.uploadButton}>Kies bestand</label>
                </div>
                <label>Bericht</label>
                <textarea name="content" rows="10" required value={content} onChange={(e) => setContent(e.target.value)}/>
                <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
        </div>
    );
};

export default NewBlogPost;
