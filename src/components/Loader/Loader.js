import { css } from "@emotion/react";
import styles from './Loader.module.css'
import ClipLoader from "react-spinners/ClipLoader";
export default function Loader() {
    return(
        <div className={styles.container}>
             <ClipLoader color={"blue"}  size={150}/>
        </div>

    )
}