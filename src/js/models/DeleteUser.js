import * as source from '..';
import axios from 'axios';

export const deleteUser = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.delete(`${proxy}http://ardeshna-task-manager.herokuapp.com/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });

    if (response) {     
        
        // DELETE TOKEN FROM LOCALSTORAGE
        window.localStorage.removeItem('token');

        // CHECK FOR TOKEN
        source.checkToken();
    }
};