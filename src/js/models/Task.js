import axios from 'axios';
import * as source from '..';
import * as taskView from '../views/taskView';

export const userTask = async (taskInput, taskValue) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.post(`${proxy}https://ardeshna-task-manager.herokuapp.com/tasks`, {
        description: taskInput,
        completed: taskValue,
        createdAt: new Date().getTime()
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });

    if (response) {
        
        // remove rows
        source.removeRow(); 

        // get the task
        taskView.getTask();

        // hide next and prev button
        document.querySelector('.prevBtn').style.display = 'none';
        document.querySelector('.nextBtn').style.display = 'none';   
    } 
};