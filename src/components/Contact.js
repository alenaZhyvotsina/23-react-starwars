import React, {Component} from 'react';
import style from '../css_modules/contact.module.css';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const planetsStr = localStorage.getItem('planets');
        if(planetsStr){
            const planets = JSON.parse(planetsStr);
            if(planets.expireDate > Date.now()) {
                this.setState({
                    isLoading: false,
                    planets: planets.value
                });
            }
        }
        if(!this.state.planets) {
            fetch('https://sw-info-api.herokuapp.com/v1/planets')
                .then(response => response.json())
                .then(data => {
                    const planetsArray = [];
                    for(let i = 0; i < data.length; i++) {
                        planetsArray.push({
                            id: data[i].id,
                            name: data[i].name
                        });
                    }

                    console.log(planetsArray);

                    this.setState({
                        isLoading: false,
                        planets: planetsArray
                    });

                    const expire = Date.now() + 30 * 24 * 60 * 60 * 1000;

                    localStorage.setItem('planets', JSON.stringify({
                        value: this.state.planets,
                        expireDate: expire
                    }));

                });
        }
    }

    render() {
        if(this.state.isLoading){
            return <div className='spinner-border'/>
        } else {
            return (
                <div className='container'>
                    <form className={style.contacts + ' row flex-column'}>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                        <label htmlFor="planet">Planet</label>
                        <select id="planet" name="planet">
                            {this.state.planets.map(item => {
                                return <option key={item.id}>{item.name}</option>
                            })}
                        </select>

                        <label htmlFor="subject">Subject</label>
                        <textarea id="subject" name="subject" placeholder="Write something.."/>

                        <input type="submit" className='btn btn-danger w-100' value="Submit"/>
                    </form>
                </div>
            );
        }
    }
}

export default Contact;