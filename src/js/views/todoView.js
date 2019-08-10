import * as Logout from '../models/Logout';
import * as DeleteUser from '../models/DeleteUser';
import * as taskView from './taskView';
import * as Task from '../models/Task';
import * as source from '..';
import * as ProfileDropdown from '../models/ProfileDropdown';
import * as SortBy from '../models/SortBy';

// TASKAPP PAGE
export const renderTodoPage = async () => {
    const html = `
        <div class="container">
            <div class="addTask">
                <div class="addTask-section">
                    <form class="taskForm">
                        <lable>Description</lable>
                        <input class="task-input" type="text" placeholder="description">
                        <label>Completed</label>
                        <input class="task-value" type="text" placeholder="true/false"> 
                        <button class="add__task" type="submit">Add</button>
                    </form>
                </div> 
                
                <div class="hide">
                    <input class="avatrUrl" type="text">
                </div>

                <div class="logout">
                    <button type="submit">Signout</button>        
                </div>

                <div class="profilePic">
                    <img class="userImg" src="" alt="User Profile"><br/>

                    <div class="fileSelector">
                        <input type="file" name="avatar"><br/>
                        <button class="upload" type="submit">Upload</button>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="dropbtn"><img src="https://image.flaticon.com/icons/svg/25/25243.svg" alt="arrow down"></button>
                    <div id="myDropdown" class="dropdown-content">
                        <button class="remove" type="submit">Remove Profile</button>
                        <button class="add" type="file">Add Profile</button>                        
                        <button class="logoutAll" type="submit">Logout All</button>
                        <button class="delete-user" type="submit">Delete Account</button>
                    </div>
                </div>
            </div> 

            <div class="showTask">                
                <div class="table">
                    <table id="table-data">                                                
                    </table>
                </div>
                <div class="arrowNextPrev"></div>                              
            </div>
        </div>
    `;
    
    document.querySelector('.main-section').innerHTML = html; 

    if (window.localStorage.getItem('avatarUrl')) {

        // GET AVATAR FROM DATABASE
        const userId = window.localStorage.getItem('userId');
        ProfileDropdown.getProfilePic(userId);

    } else {
        const dummy = 'https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg';

        // USER DUMMY AVATAR
        const markup = `
            <img src="${dummy}" alt="User Profile">
        `;

        document.querySelector('.profilePic').insertAdjacentHTML('afterbegin', markup);
    }


    // PAGINAITON BUTTON
    const previousButton = () => {
        const html = `
            <div class="prevBtn">
                <button class="previous"><img src="https://image.flaticon.com/icons/svg/25/25184.svg">Prev</button>
            </div>
        `;

        document.querySelector('.arrowNextPrev').insertAdjacentHTML('beforeend', html);
    };

    const nextButton = () => {
        const html = `
            <div class="nextBtn">
                <button class="next">Next<img src="https://image.flaticon.com/icons/svg/25/25446.svg"></button>            
            </div>
        `;

        document.querySelector('.arrowNextPrev').insertAdjacentHTML('beforeend', html);
    };

    // NEXT BUTTON 
    nextButton();
        
    // PREVIOUS BUTTON
    previousButton();    
    
    // SIGNOUT FROM ACCOUNT
    const logOut = document.querySelector('.logout');

    if (logOut) {
        logOut.addEventListener('click', () => {            
            Logout.logout();
        });
    }

    // RENDER TASKS IN TABLE
    const length = await taskView.getTask();

    SortBy.sortByAndPage(undefined, length, 0);

    source.sortByAndPagination(length);

    // ADD TASK
    const addTask = document.querySelector('.add__task');
    
    addTask.addEventListener('click', async (e) => {
        e.preventDefault();

        const taskInput = document.querySelector('.task-input'); // FORM DESCRIPTION VALUE
        const taskValue = document.querySelector('.task-value'); // FORM COMPLETED VALUE

        if (taskInput && taskValue) {

            await Task.userTask(taskInput.value, taskValue.value);
            
            taskInput.value = '';
            taskValue.value = '';
            taskInput.focus();

            // Call gettask function
            await taskView.getTask();
        }
    });

    // DROPDOWN MENU BUTTON
    const dropbtn = document.querySelector('.dropbtn');
    source.dropDownBtn(dropbtn);

    // HIDE DROPDOWN
    source.hideDropDown();
    
    // REMOVE PROFILE
    const remove = document.querySelector('.remove');
    source.removeProfile(remove);

    // ADD PROFILE
    const add = document.querySelector('.add');
    source.addProfile(add);

    // LOGOUT FROM ALL ACTIVE SESSIONS
    const logoutAll = document.querySelector('.logoutAll');

    if (logoutAll) {
        logoutAll.addEventListener('click', () => {
            Logout.logoutALL() 
        });
    }

    // DELETE ACCOUNT
    const deleteAc = document.querySelector('.delete-user');

    if (deleteAc) {
        deleteAc.addEventListener('click', DeleteUser.deleteUser);
    }

    // PROFILE UPLOAD BUTTON
    const upload = document.querySelector('.upload');

    if (upload) {
        upload.addEventListener('click', async (e) => {
            e.preventDefault();

            // SELECT FILE
            const file = e.target.parentNode.children[0].files[0];
            
            // CALL UPLOADPROFILE
            source.uploadProfile(file);
        });
    }
};

