import axios from 'axios';
import * as source from '..';

// User logout
export const logout = async () => { 
    
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.post(`${proxy}http://sahil-task-manager.herokuapp.com/users/logout`, {}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*',            
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    });

    if (response.status === 200) {
        
        // REMOVE TOKEN
        window.localStorage.removeItem('token');

        // REMOVE USERID
        window.localStorage.removeItem('userId');

        // CHECK FOR TOKEN
        source.checkToken();
    }
}; 

// Logout user from all device
export const logoutALL = async () => {    
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.post(`${proxy}http://ardeshna-task-manager.herokuapp.com/users/logoutALL`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });

    if (response.status === 200) {
        
        // REMOVE TOKEN
        window.localStorage.removeItem('token');

        // REMOVE USERID
        window.localStorage.removeItem('userId');

        // CHECK FOR TOKEN
        source.checkToken();
    }
}; 