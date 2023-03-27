 // Get date
 today = new Date();
 elDate = document.getElementById('date');

 // Display date
 function displayDate(){
    date = today.getDate();
    day = today.getDay();
    month = today.getMonth();
    hour = today.getHours();
    year = today.getFullYear();
    hour = today.getHours();
    minute = today.getMinutes();

    daysofweek = ['Sun', 'Mon', 'Tue','Wed','Thur','Fri','Sat','Sun'];
    monthsofyr = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
    // Format minute if less than 10.
    if (minute<10){
        minute = '0' + minute;
    }

    elDate.innerHTML = daysofweek[day] + ', ' + monthsofyr[month] +
    ' ' +date + ' '+year + '<br>' + '@ ' +  hour + ': '+minute + ' local time.';
 }
displayDate();


// let elRemoveImg =  document.querySelectorAll('img.delete_task');
 let elReport = document.getElementById('reportlimit');
 let elRemoveImg =  document.querySelectorAll('div.delImgContainer');
 function removeTask(event) {   
    
    // update list index - used for identifying main and sub task lists.
    index -= event.target.parentElement.parentElement.children.length
  
    event.target.parentElement.parentElement.remove()    
       
    }

// Define function that looks for user inputs


function addTask(){
    elTask = document.querySelector('ol.task-main')
    

    if(index%2!=0){
        let elUlist = document.createElement('ul')
       
       
        const items = elUI.value.split("\n");
        let html = "";
        for (let i = 0; i < items.length; i++) {
            // see if new line has content.
            if(items[i].length>0){
                // html += "<li>" + items[i] + "</li>";
                let elList = document.createElement('li')
                elList.append(items[i])
                elUlist.append(elList)
                console.log('I\'m in newline check')
            }        
        }
        // elList.innerHTML = html;
        elUlist.setAttribute('class','subTask')
        // elUlist.append(elList)

        
       // bullet poins categroy
        let elsubtasks = document.querySelectorAll('li.taskTitle')
        console.log(elsubtasks)
        elsubtasks[(index-1)/2].append(elUlist)

        elUI.placeholder = 'New task title..'

    }
    else {
        let elList = document.createElement('li')
       
        elList.innerText = elUI.value 
        elList.setAttribute('class','taskTitle') 

        // elList.classList.add('')     
        let imgDiv = document.createElement('div')
        imgDiv.setAttribute('class','delImgContainer')
        let elImg = document.createElement('img')
        elImg.src = "images/trash_can.png"
        elImg.setAttribute('class', 'deleteTask')
        

        imgDiv.append(elImg)
        elList.append(imgDiv)
        elTask.append(elList)

        // This code snippet below is used only to see event.stopPropagation()
        //  functionality to stop bubbling. 
        elImgs = document.querySelectorAll('img.deleteTask')
        if(elImgs.length == 3){
            // if there is no image for testing bubbline, 
            //  then make one.
            if(document.querySelectorAll('.stopprop').length <1){
                
                elImg.classList.add('stopprop')
                let imgStopProp = document.querySelector('.stopprop')
                imgStopProp.addEventListener('click', (event) => {
                event.stopPropagation()
                console.log('Not going to delete.')
                }
                )
            }          
        
        }
        elUI.placeholder = 'Add bullet points..'
    }
    index++;  
    elUI.value = ''
    //refocus on textArea
    setup()
       
}

function setup(){
    elUI.focus();
}

let elUI = document.getElementById('tasksUI');
// focus on text area when page loads.
window.addEventListener('load',setup(),false)


let index = 0;
let n_times = 0;

let elTask = document.querySelector('ol.task-main')
let elImgs = document.querySelectorAll('img')
let elSave = document.getElementById('saveTasks');
elSave.addEventListener('click', (event) => {
    if (elUI.value.length > 0){
        
        addTask()
        // console.log(event.target)
       
    }
    
}, false)

// Delegate task to ol - main container for task lists. 
elTask.addEventListener('click',(event)=> {
    // see if event comes from 'delete' img.
    if(event.target.tagName === 'IMG'){
        removeTask(event)
    }
})



// elTaskContainer.addEventListener('')

 
       











