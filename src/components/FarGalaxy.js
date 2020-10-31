import React, {Component} from 'react';
import styles from "../css_modules/fargalaxy.module.css";

class FarGalaxy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true

        }
    }

    // SessionStorage
    componentDidMount() {
        const opening_crawl = sessionStorage.getItem('opening_crawl');
        if(opening_crawl){
            this.setState({
                isLoading: false,
                opening_crawl
            });
        } else {
            let filmId = Math.floor(Math.random() * 6) + 1;
            fetch(`https://sw-info-api.herokuapp.com/v1/films/${filmId}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoading: false,
                        opening_crawl: data.opening_crawl
                    });
                    sessionStorage.setItem('opening_crawl', data.opening_crawl);
                }
                );
        }


    }

    render() {
        const text = this.state.isLoading ? 'Loading...' : this.state.opening_crawl;
        return (
            <div>
                <p className={styles.farGalaxy}>{text}</p>
            </div>
        );
    }
}

export default FarGalaxy;