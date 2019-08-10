import axios from'axios';

export const deleteTask = async (id) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.delete(`${proxy}https://sahil-task-manager.herokuapp.com/tasks/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });

    if (response) {
        return response;
    }
};