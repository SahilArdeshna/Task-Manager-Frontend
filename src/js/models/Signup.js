import axios from 'axios';
import * as source from '..';

const createUser = async (obj, headers) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.post(`${proxy}http://sahil-task-manager.herokuapp.com/users`, {
        name: obj.name,
        email: obj.email,
        password: obj.password
    }, {
        headers
    });
    
    if (response) {        
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('userId', response.data.user._id);
        source.checkToken();
    }
};

export const userSignup = () => {

    // HEADER FOR LOGIN USER
    let headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const name = document.querySelector('.signup__name').value;
    const email = document.querySelector('.signup__email').value;    
    const password = document.querySelector('.signup__password').value;

    createUser({ name, email, password }, headers);
};