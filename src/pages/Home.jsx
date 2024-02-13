import NewBlogPost from "../components/NewBlogPost"
import BlogCard from "../components/BlogCard"

const Home = () => {
    return(
        <>
        <p>Home Page</p>
        <div>
            <NewBlogPost />
            <BlogCard />
        </div>
        </>
    )
}

export default Home