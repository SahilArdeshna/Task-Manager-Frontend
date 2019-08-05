import axios from 'axios';

export const updateTask = async (descValue, compValue, id) => { 
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.patch(`${proxy}https://ardeshna-task-manager.herokuapp.com/tasks/${id}`, {
        description: descValue,
        completed: compValue
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });

    if (response) {
        return response;
    }
};