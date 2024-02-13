import { Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Footer from "./components/Footer";

function App() {

  return (
    <>
   
    <Header />
    <div className='container'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/*" element={<h1>Page not found</h1>} />
    </Routes>
    </div>
    <Footer />
    </>
    
  )
}

export default App
