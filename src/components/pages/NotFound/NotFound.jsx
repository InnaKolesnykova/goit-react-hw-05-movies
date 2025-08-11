import { Link } from "react-router-dom";
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.box}>
            <h1 className={styles.message}>Page wasn't found 😢</h1>
            <Link to='/'  className={styles.link}>Return home</Link>
        </div>
    )
}

export default NotFound;