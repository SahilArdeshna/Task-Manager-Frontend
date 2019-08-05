import axios from 'axios';
import * as source from '..';
 
// USER LOGIN
const userLogin = async (email, password, headers) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.post(`${proxy}http://ardeshna-task-manager.herokuapp.com/users/login`, {
        email,
        password
    }, {
        headers 
    });
    
    if (response) {
        console.log(response);

        // STORE UESR ID
        window.localStorage.setItem('userId', response.data.user._id);
        console.log(window.localStorage.getItem('userId'));

        // STORE TOKEN
        window.localStorage.setItem('token', response.data.token); 

        // CHECK FOR TOKEN
        source.checkToken();               
    }
};

// SUBMITING THE FORM
export const submitForm = () => {

    // HEADER FOR LOGIN USER
    let headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const email = document.querySelector('.add__email').value; // EMAIL VALUE
    const password = document.querySelector('.add__password').value; // PASSWORD VALUE
    
    // CALL USER LOGIN
    userLogin(email, password, headers);    
};