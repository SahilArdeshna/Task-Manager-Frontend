import axios from 'axios';

// GET TASK FROM DATABASE
export const getTask = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.get(`${proxy}https://sahil-task-manager.herokuapp.com/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });  
 
    if (response) {

        return response.data.length;            
    }
};