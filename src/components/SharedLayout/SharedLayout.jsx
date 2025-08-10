import { NavLink } from "react-router-dom";
import styles from './SharedLayout.module.css';

export const SharedLayout = ({children}) => {

    const navLinkStyles = ({ isActive }) => {
        return {
            color: isActive ? '#ff0054' : 'inherit',  
        }
    }
    
    return (
        <div>
            <nav className={styles.NavbarBox}>
                <NavLink to="/" style={navLinkStyles} className={styles.link} end >
                    Home
                </NavLink>
                <NavLink to="/movies" style={navLinkStyles} className={styles.link} >
                    Movies
                </NavLink>
            </nav>
            <div>{children}</div>
        </div>
    );
};