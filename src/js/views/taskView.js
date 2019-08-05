import axios from 'axios';
import * as source from '..';
import * as SortBy from '../models/SortBy';

// GET TASK FROM DATABASE
export const getTask = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.get(`${proxy}https://ardeshna-task-manager.herokuapp.com/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });  
 
    if (response) {  
        
        // call pagination when page load
        await SortBy.sortByAndPage(undefined, response.data.length, 0);           

        return response.data.length;            
    }
};