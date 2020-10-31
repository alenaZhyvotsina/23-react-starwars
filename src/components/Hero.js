import React from 'react';
import hero from "../images/main.jpg";
import styles from '../css_modules/hero.module.css';

const Hero = () => {
    return (
        <section className="float-left w-25 mr-2">
            <img className={`col ${styles.hero}`} src={hero} alt="Luke Skywalker"/>
        </section>
    );
};

export default Hero;