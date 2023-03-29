 // ---------------- fcn that stores data on the ocal storage  ------------------------  //
function store_data(){
    
    let allTasks = document.querySelector('ol')
    let taskDataContainer = []
    
    // collect data and store in local storage
      
    for(let i=0; i<allTasks.children.length; i++){
    
        let data = allTasks.children.item(i).innerText      
        let dataFrmtd = data.split('\n')
        // console.log(dataFrmtd, dataFrmtd.length)
        let subTasks = []
        let taskTitles = []
        dataFrmtd.forEach((data,index) => {
            if(index>0){
                subTasks.push(data)
            }
            else{
                taskTitles.push(data);              
            }
        })
        
        taskDataContainer.push({'title':taskTitles})
        taskDataContainer.push({'subtask':subTasks})  
        
        }
        return JSON.stringify(taskDataContainer)
}
export {store_data}
       
