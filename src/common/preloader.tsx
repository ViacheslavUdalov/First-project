import gif from '../../src/common/images/yy3.gif';
import React from "react";
import styles from './FormControls.module.css'
const Preloader = () => {
    return <div>
        <img src={gif} alt="preloader" className={styles.preloader} />
    </div>
}
export default Preloader;