//  -----------------------  This script contains three major functions --------------------  
//    --------------------  fcn that adds new tasks and subtasks, fcn that removes tasks 
//                           and one that loads perviously saved task lists from local storage
// ------------              imported fcns.. fcn that calculates date and time
// -----------                            .. and fcn that stores data to local storage

import { displayDate } from "./dategenerator.js";
import { store_data as sd } from "./dataStore.js";
import {searchPage} from "./search_filter.js"

// Access current date and time and display on web header.
let elDate = document.getElementById('date');
let elTime = document.getElementById('time');
let temp = displayDate()
elTime.innerHTML = temp.pop();
elDate.innerHTML = temp.pop();


// ------------------ GLOBAL VARIABLES --------------------------------- //
// HTML components

let elUI = document.getElementById('tasksUI');
let elTask = document.querySelector('ol.task-main')
let elAddTask = document.getElementById('addTasks')
let elSaveTask = document.getElementById('saveTasks')

let elSearchButton = document.getElementById('searchButton')
let elSearchKey = document.getElementById('searchKey')
let elSearchResult = document.querySelector('searchResult')

// 'li' index counter for addTask functionalities
let index = 0;
// Data store and load variables
let isToLoad = false;
let index_loaddata = 0;



// ----------------  Function that adds task lists  ----------------------- //

function addTask(){
    elTask = document.querySelector('ol.task-main')
    // see if page needs to load data from local storage.
    if(isToLoad){
        index = index_loaddata;
        // console.log(index)
    }
    // if index is odd then add it to subtasks.   
    if(index%2 != 0){
        addSubTasks()            
    }else {
        addMainTask()
    }        
  
    index++;  
    elUI.value = ''
    elUI.focus()
        
}

function createElement(tagName, className){
    // This function creates elements using tag name and class name
    let element = document.createElement(tagName)
    element.setAttribute('class',className)
    return element
}

function addSubTasks(){
    // fcn for subtasks.
    let elUlist = createElement('ul', 'subTask')
    const items = elUI.value.split("\n");
    
    items.forEach((item) => {
        if(item){
            let elList = createElement('li','subBullet')
            elList.append(item)
            elUlist.append(elList)
        }
    })    
            
   // bullet points categroy
    let elsubtasks = document.querySelectorAll('li.taskTitle')
    // refer main task list by finding previous even li node
    elsubtasks[(index-1)/2].append(elUlist)

    elUI.placeholder = 'New task title..'  

}

function addMainTask(){
   
    let elList = createElement('li','taskTitle')
    elList.innerText = elUI.value 

    // creat div, img elements
    let imgDiv = createElement('div','delImgContainer')   
    let elImg = createElement('img','deleteTask')
    elImg.src = "images/trash_can.png"    
    
    imgDiv.append(elImg)
    elList.append(imgDiv)
    elTask.append(elList)

    elUI.placeholder = 'Add bullet points..'
        
}
//  ------------------ Function that removes tasks. ----------------- //
function removeTask(event) {   
    
    // Remove and update list index - used for identifying main and sub task lists.
    if(event.target.tagName === 'IMG'){
        index -= event.target.parentElement.parentElement.children.length  
        event.target.parentElement.parentElement.remove() 
    }
    // Highlight task complete with line through text-decoration
    else {
        // toggle class for li items
        let parentOfLi = event.target.parentElement
        if(parentOfLi.tagName === 'UL'){
            // block toggling if grandParent already set to class 'complete'
            if(! parentOfLi.parentElement.classList.value.includes('complete')){
                event.target.classList.toggle('complete')
                
            }
                }
        else {
            event.target.classList.toggle('complete')
        }             
    }    
       
}       



// ------------------------- fcn that loads task lists from local storage . ------------- //
function tasksFromLocalStorage(){
    let data_to_load = JSON.parse(localStorage.getItem('tasks'))    
    let taskName = ''    
    
    if(data_to_load){
        // console.log(data_to_load.length)
        isToLoad = true;
        data_to_load.forEach((data, outer_index) => {
            
            // if index is even, add it to main task otherwise subtask.
            if (outer_index%2 == 0){
                taskName = data.title
            }
            else {
                // collect individual subtasks into separate lines
                let substring = ''
                data.subtask.forEach((data) => {
                    substring += data + '\n';
                }  )             
                    
                taskName = substring;
            }
            elUI.value = taskName
            index_loaddata = outer_index;
            
            addTask()
        
        })
        // reset loading bool so user can add tasks manually
            isToLoad = false
    }
    
}


// ------------------        EVENTS   ------------------------    //
// Event on page load
window.addEventListener('load',setup(),false)

// Event on 'save' button press
elAddTask.addEventListener('click', (event) => {
    // Add New task only if textArea content is not empty.
    if (elUI.value.length > 0){        
        addTask()       
    }
    
}, false)

// Event on 'store' button press
elSaveTask.addEventListener('click', (event) => {
    let data_to_store = sd()
    localStorage.setItem('tasks',data_to_store)
})

// Delegate task to ol - main container for task lists. 
elTask.addEventListener('click',(event)=> {
    // see if event comes from 'delete' img.
    if(event.target.tagName === 'IMG' || event.target.tagName === 'LI'){
        removeTask(event)
    }
   
})

// Window loading setup
function setup(){
    
    // load previous task list from local storage
    tasksFromLocalStorage()
    // focus to textArea
    elUI.focus();            
}

elSearchKey.addEventListener('input', (event) => {
    let keywords = elSearchKey.value.trim();

    if (!keywords) {
        // If it's empty or contains only whitespaces
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Local development URL
            window.location.href = 'http://localhost:5500';
        } else {
            // Production URL
            window.location.href = 'https://brukgit.github.io/toDoListApp/';
        }
    }
});



elSearchButton.addEventListener('click',(event) => {
    event.preventDefault();    
    searchPage();
   
    
})


       