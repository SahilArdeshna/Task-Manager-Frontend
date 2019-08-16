import axios from 'axios';
import * as source from '../';

export const removeProfilePic = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.delete(`${proxy}http://sahil-task-manager.herokuapp.com/users/me/avatar`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    });

    if (response) {      

        // REMOVE AVATAR FROM LOCALSTORAGE
        window.localStorage.removeItem('avatarUrl');

        // REMOVE EXISTING AVATAR
        const profilePic = document.querySelector('.profilePic');
        profilePic.removeChild(profilePic.children[0]);
        
        // SHOW DEFAULT AVATAR
        const userImg = document.querySelector('.userImg');
        userImg.style.display = 'block';
        userImg.setAttribute('src', 'https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg');
    }
};


// UPLOAD AVATAR ON DATABASE
export const uploadProfilePic = async (file) => {
    let data = new FormData();    
    data.append('avatar', file);

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.post(`${proxy}http://sahil-task-manager.herokuapp.com/users/me/avatar`, data , {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',            
            'Authorization': window.localStorage.getItem('token')
        }
    });    

    if (response) {

        // HIDE BUTTON AND INPUT FIELD
        // document.querySelector('.userImg').style.display = 'none'; // IMG TAG
        document.querySelector('.fileSelector').style.display = 'none'; // INPUT FIELD
        document.querySelector('.upload').style.display = 'none'; // UPLOAD BUTTON

        // GET AVATAR FROM DATABASE
        const userId = window.localStorage.getItem('userId');
        getProfilePic(userId);
    }
};

// GET AVATAR FROM DATABASE
export const getProfilePic = async (id) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.get(`${proxy}http://sahil-task-manager.herokuapp.com/users/${id}/avatar`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'POST, GET, OPTIONS'
        }
    });

    if (response) {

        // REMOVE EXISTING AVATAR
        source.checkForAvatar(response);
    } else {

        // REMOVE EXISTING AVATAR
        source.checkForAvatar(response);
    }
};