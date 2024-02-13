import { Link, useLocation } from "react-router-dom"
import logo from "../assets/images/logo_white.png"
import styles from "../styles/header.module.css"


const Header = () => {
    
    const location = useLocation();
    let pageTitle;

    switch (location.pathname) {
      case "/blog":
        pageTitle = "Blog";
        break;
      default:
        pageTitle = "";
    }

    return(
        <nav className={styles.navbar}>
            <div className={styles.headerContainer}>
            <Link to="/"><img className={styles.logo} src={logo} alt="SB_logo" /></Link>
            <ul>
                <li className={location.pathname === '/' ? styles.active : ''}>
                    <Link to="/">Home</Link>
                </li>
                <li className={location.pathname.startsWith('/blog') ? styles.active : ''}>
                    <Link to="/blog">Blog</Link>
                </li>
            </ul>
            </div>
            <div className={styles.breadcrumb}>
          <h1>{pageTitle}</h1>
        </div>
        </nav>
    )
}

export default Header