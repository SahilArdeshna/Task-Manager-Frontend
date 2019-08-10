import axios from 'axios';
import * as source from '..';

// SORT AND PAGINATION 
export const sortByAndPage = async (parameter, resLength, sum) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.get(`${proxy}http://sahil-task-manager.herokuapp.com/tasks?${parameter ? parameter : `limit=5&skip=${sum}`}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token') 
        }
    });

    if (response) {
        if (response.data.length === 5) {
            
            sum = sum + 5;

            // remove row
            source.removeRow();
    
            // render response on table
            source.renderTable(response.data);
    
            // mouse event
            source.mouseEvent();       
                        
            if (resLength/sum === Infinity) {    

                // show next button
                document.querySelector('.nextBtn').style.display = 'block';
                
            } else if (resLength/sum === 1) {
                
                // show next button
                document.querySelector('.nextBtn').style.display = 'none';

            } else if (resLength/sum > 1) {

                // hide next button
                document.querySelector('.nextBtn').style.display = 'block';
            }

        } else {
            
            // remove row
            source.removeRow();
    
            // render response on table
            source.renderTable(response.data);
    
            // mouse event
            source.mouseEvent();  

            // hide next button
            document.querySelector('.nextBtn').style.display = 'none';
        }      

        source.sortBy();
    } 
};