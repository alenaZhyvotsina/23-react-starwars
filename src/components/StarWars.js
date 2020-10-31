import React from 'react';
import styles from '../css_modules/fargalaxy.module.css';
import {starWarsInfo} from "../utils/Constants";

const StarWars = () => {
    return (
        <div className={styles.farGalaxy}>
            {starWarsInfo}
        </div>
    );
};

export default StarWars;