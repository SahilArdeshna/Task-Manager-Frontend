import * as loginView from './views/loginView';
import * as todoView from './views/todoView';
import * as UpdateTask from './models/UpdateTask';
import * as DeleteTask from './models/DeleteTask';
import * as SortBy from './models/SortBy';
import * as ProfileDropdown from './models/ProfileDropdown';
import * as taskView from './views/taskView';

// CHECK FOR TOKEN 
export function checkToken() {
    
    // Empty div section.    
    document.querySelector('.main-section').innerHTML = '';

    if (window.localStorage.getItem('token')) {
                
        // run task page
        todoView.renderTodoPage();   

    } else {       
        
        // run login page
        loginView.loginPage();     
    }
};

checkToken();

// CREATE CLASS ATTRIBUTE ON TABLE ROW
const giveRowClass = (table) => {
    for (var i = 1; i < table.rows.length; i++) {
        const tr = document.getElementsByTagName("TR")[i];    
        var att = document.createAttribute("class");
        att.value = "row";
        tr.setAttributeNode(att);
    };
};

// CREATE TABLE HEAD
function tableHead(arrKey) {

    // GET TABLE
    const table = document.querySelector('table');

    // TABLE RAW
    const tr = table.insertRow(table.rows.length);

    arrKey.forEach((el) => {
        const th = document.createElement('th');
        th.innerHTML = el;
        tr.appendChild(th);
    }); 
};

// CREATE TABLE DATA
function tableData(arrValue) {

    // GET TABLE
    const table = document.querySelector('table');

    // TABLE ROW
    const tr = table.insertRow(table.rows.length);

    arrValue.forEach((el) => {
        const td = document.createElement('td');
        td.innerHTML = el;
        tr.appendChild(td);
    });
    
    giveRowClass(table);

    const tableRows = document.querySelectorAll('.row');
    tableRows.forEach((el) => {
        el.children[7].style.borderTopStyle = 'hidden';
        el.children[7].style.borderRightStyle = 'hidden';
        el.children[7].style.borderBottomStyle = 'hidden';
    });
};

// REMOVE ALL ROWS WHEN RESPONSE COME
export const removeRow = () => {
    const table = document.querySelector('table');
    const tableRow = document.querySelectorAll('tr');        
    
    tableRow.forEach((el) => {
        const index = el.rowIndex;
        table.deleteRow(index);
    });
}; 

// CREATE AND RENDER TABLE
export const renderTable = (response) => {

    // EDIT, DELETE AND SAVE BUTTON FOR ROWS
    const html = `
        <div class="taskEditBtn">
            <button class="editTaskBtn">Edit</button>
            <button class="deleteTaskBtn">Delete</button>                
            <button class="saveBtn">Save</button>
        </div>
    `;

    // INPUT FIELD FOR ROW
    const editInput = `
        <div class="inputEdit">
            <input type="text">
        </div>                          
    `;  

    const sort = `
        <button class="sortByBtn"><i class="ion-ios-arrow-up"></i></button>
    `;

    let num = 0;   
        
    if (response.length >= 1) {

        // RESPONSE KEY
        let resKey = Object.keys(response[0]);        
        
        // CALL TABLE HEAD FUCNTION
        tableHead(['No.',resKey[2], resKey[0], resKey[3] + sort, resKey[5], resKey[1], resKey[4]]);   


        // LOOP OVER RESPONSE
        response.forEach((el) => {
            
            // RESPONSE VALUE
            let resValue = Object.values(el);            

            // CONVERT UPDATEDAT AND CREATEDAT REGULAT TIME
            const resValue3 = moment(resValue[3]).format('hh:mm a D/MM/YY');
            const resValue5 = moment(resValue[5]).format('hh:mm a D/MM/YY');

            // CALL TABLE DATA FUNCTION
            tableData([num += 1, resValue[2] + editInput, resValue[0] + editInput, resValue3, resValue5, resValue[1], resValue[4], html]);
        });        
    }
};

// MOUSE OVER AND MOUSE OUT EVENT ON TABLE ROW 
export const mouseEvent = () => {  

    // INPUT FIELD FOR ROW
    const editInput = `
        <div class="inputEdit">
            <input type="text">
        </div>                          
    `;

    // GET TABLE
    const table = document.querySelector('table');

    // TABLE ROWS
    const tableRows = document.querySelectorAll('.row');

    // MOUSE OVER EVENT ON TABLE ROWS
    tableRows.forEach((el) => {          
        el.addEventListener('mouseover', (e) => {                
            e.preventDefault();   

            // show task edit buttons to the ui
            el.children[7].children[0].style.display = 'block';                    
        });        
    });  

    // MOUSE OUT EVENT ON TABLE ROWS
    tableRows.forEach((el) => {
        el.addEventListener('mouseout', (e) => {
            e.preventDefault();    
            
            // HIDE BUTTON FROM UI
            el.children[7].children[0].style.display = 'none';
        });        
    }); 
    
    tableRows.forEach((el) => {

        // TASK ID 
        const id = el.children[5].innerHTML;        

        // USER ID
        const ownerId = el.children[6].innerHTML;        

        // TASK EDIT BUTTON      
        el.children[7].children[0].children[0].onclick = function (e) {
            e.preventDefault();
            el.children[7].children[0].children[0].style.display = 'none'; // editTaskBtn hide 
            el.children[7].children[0].children[1].style.display = 'none'; // deleteTaskBtn hide
            el.children[7].children[0].children[2].style.display = 'block'; // saveBtn unhide
            el.children[1].children[0].style.display = 'inline-block'; // show input field for description
            el.children[2].children[0].style.display = 'inline-block'; // show input field for completed 
            const descValue = el.children[1].outerText.replace(' ', '');
            const compValue = el.children[2].outerText.replace(' ', '');   

            el.children[1].children[0].children[0].value = descValue; // provide input field cur description value
            el.children[2].children[0].children[0].value = compValue; // provide input field cur completed value
        };

        // TASK SAVE BUTTON
        el.children[7].children[0].children[2].onclick = async function (e) {
            e.preventDefault();

            if (!el.children[1].children[0].children[0].value) {
                el.children[7].children[0].children[0].style.display = 'inline-block'; // editTaskBtn
                el.children[7].children[0].children[1].style.display = 'inline-block'; // deleteTaskBtn
                el.children[7].children[0].children[2].style.display = 'none'; // saveBtn
                el.children[1].children[0].style.display = 'none'; // hide input field for description
                el.children[2].children[0].style.display = 'none'; // hide input field for completed
                
                return alert('Nothing Changed!');
            } 

            const descriptionValue = el.children[1].children[0].children[0].value;
            const completedValue = el.children[2].children[0].children[0].value;            

            const updateTaskRes = await UpdateTask.updateTask(descriptionValue, completedValue, id);

            el.children[1].children[0].style.display = 'none'; // input field for description
            el.children[2].children[0].style.display = 'none'; // input field for completed

            el.children[1].innerHTML = updateTaskRes.data.description + editInput; // update cell 2(description) value
            el.children[2].innerHTML = updateTaskRes.data.completed + editInput; // update cell 3(completed) value
            el.children[4].innerHTML = moment(new Date().getTime()).format('hh:mm a D/MM/YY'); // update upadateAt cell

            el.children[7].children[0].children[0].style.display = 'inline-block'; // editTaskBtn unhide
            el.children[7].children[0].children[1].style.display = 'inline-block'; // deleteTaskBtn unhide
            el.children[7].children[0].children[2].style.display = 'none'; // saveBtn hide
        };

        // TASK DELETE BUTTON
        el.children[7].children[0].children[1].onclick = async function (e) {
            e.preventDefault();
            const response = await DeleteTask.deleteTask(id, ownerId);
            
            if (response) {
                const index = el.rowIndex;
                table.deleteRow(index);

                tableRows.forEach((cur) => {
                    cur.children[0].innerHTML = cur.rowIndex;
                });
            }
        };
    });    
};

// FOR SORTLIST
let count = 1;   

// FOR PAGINATION
let sum = 0;

// SORTING AND 
export const sortBy = async () => {     

    const sortBtn = document.querySelector('.sortByBtn');

    if (sortBtn) {

        // SORT BUTTON
        sortBtn.addEventListener('click', async (e) => {
            e.preventDefault();     
            
            let time;
            
            if (count % 2 === 0) {
                time = 'asc';   
            } else {
                time = 'desc';
            } 
            
            await SortBy.sortByAndPage(`limit=5&skip=${sum}&sortBy=createdAt:${time}`);   
    
            count++;
        });  
    }
};

// PAGINATION
export const sortByAndPagination = async (resLength) => {   
    const prev = document.querySelector('.previous');
    const next = document.querySelector('.next');  

    prev.addEventListener('click', async (e) => {
        e.preventDefault();
        
        sum = sum - 5;

        const length = await taskView.getTask();

        await SortBy.sortByAndPage(undefined, length, sum);

        if (sum <= 0) {
            document.querySelector('.prevBtn').style.display = 'none';
        }
    });

    next.addEventListener('click', async (e) => {
        e.preventDefault();

        sum = sum + 5;

        const length = await taskView.getTask();
        
        await SortBy.sortByAndPage(undefined, length, sum);

        if (sum >= 5) {
            document.querySelector('.prevBtn').style.display = 'block';
        }
    });
};

// USER PROFILE BUTTON
export const dropDownBtn = async (dropbtn) => {
    
    if (dropbtn) {
        dropbtn.addEventListener('click', async (e) => {
            e.preventDefault();
    
            document.getElementById('myDropdown').classList.toggle('show');
        });    
    }
};

// HIDE DROPDOWN BUTTON
export const hideDropDown = () => {

    window.addEventListener('click', (event) => {
        
        if (!event.target.parentNode.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                }
            }
        }
    });
};

// REMOVE PROFILE BUTTON
export const removeProfile = async (remove) => {
    remove.addEventListener('click', (e) => {
        e.preventDefault();
        ProfileDropdown.removeProfilePic();
    });
};

// ADD PROFILE BUTTON
export const addProfile = async (add) => {
    add.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.fileSelector').style.display = 'block';
        document.querySelector('.upload').style.display = 'block';
    })
};

// UPLOAD PROFILE IMAGE
export const uploadProfile = async (file) => {
    
    // CALL UPLOADPROFILEPIC FUNCTION
    ProfileDropdown.uploadProfilePic(file);
};

export const checkForAvatar = (response) => {
    let imgUrl;
    
    // REMOVE EXISTING AVATAR
    const profilePic = document.querySelector('.profilePic');
    profilePic.removeChild(profilePic.children[0]);
     
    // REMOVE EXTRA LINE FROM URL       
    const res = response.request.responseURL.replace('https://cors-anywhere.herokuapp.com/', '');

    if (response.request.responseURL) {
        let inputUrl = document.querySelector('.hide input');
        inputUrl.setAttribute('value', res);

        window.localStorage.setItem('avatarUrl', res);
        imgUrl = window.localStorage.getItem('avatarUrl');
    } else {
        imgUrl = 'https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg';
    }   

    const html = `    
        <img src="${imgUrl}" alt="User Profile">
    `;

    profilePic.insertAdjacentHTML('afterbegin', html);
};