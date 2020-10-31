import React from 'react';
import styles from '../css_modules/fargalaxy.module.css';

//LocalStorage - if > 30 days - refresh

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const aboutDataStr = localStorage.getItem('about_data');
        if(aboutDataStr){
            const aboutData = JSON.parse(aboutDataStr);
            if(aboutData.expireDate > Date.now()) {
                this.setState({
                    isLoading: false,
                    aboutData: aboutData.value
                });
            }
        }
        if(!this.state.aboutData) {
              fetch('https://sw-info-api.herokuapp.com/v1/peoples/1')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoading: false,
                        aboutData: {
                            name: data.name,
                            height: data.height,
                            birth_year: data.birth_year,
                            gender: data.gender,
                            mass: data.mass,
                            hair_color: data.hair_color,
                            skin_color: data.skin_color,
                            eye_color: data.eye_color
                        }
                    });
                    const expire = Date.now() + 30 * 24 * 60 * 60 * 1000;

                    localStorage.setItem('about_data', JSON.stringify({
                        value: this.state.aboutData,
                        expireDate: expire
                    }));

                });
        }
    }

    render() {
        if(this.state.isLoading) {
            return <div>Loading...</div>;
        }
        let keysOfData = Object.keys(this.state.aboutData);
        return (
            <div>
                {keysOfData.map(item => {
                    let keySpace = item.replaceAll('_', ' ');
                    let val = this.state.aboutData[item];
                    return <p className={styles.farGalaxy}>{keySpace}: {val}</p>
                })}
            </div>
        );
    }

}

export default AboutMe;
