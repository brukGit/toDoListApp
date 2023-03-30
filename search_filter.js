function searchPage(){
    let elAllLists = document.querySelectorAll('li.taskTitle')
    let elSearchKey = document.getElementById('searchKey')
    let elSearchResult = document.querySelector('.searchResult')
    let keywords = elSearchKey.value;
    let filteredArray = []
    
    
    
    // Collect items that match search keyword
    if(keywords){
        elAllLists.forEach((list,index) => {
            
            const items = list.innerText.split("\n")
            items.forEach((item) => {
                if(item.toLowerCase().includes(keywords.toLowerCase())){
                    // index is used to link with ID as ref during using clicking.
                    filteredArray.push([item,index])
                }
            })
            // Set ID for linking up with source.
            list.setAttribute('id', index)
            
        })
        // if filtered item available then go ahead.
        if(filteredArray.length > 0){
            elSearchResult.innerHTML = '';
            filteredArray.forEach(groupItem => {    
                const elLink = document.createElement('a')
                // link item with an ID.
                elLink.setAttribute('href',`#${groupItem[1]}`)
                elLink.innerText = groupItem[0]                                       
                elSearchResult.append(elLink)   
                console.log(elLink)
                               
            })
        }
        else{           
            elSearchResult.innerHTML =  "<p>" + "No search matches were found." + "</p>" 
        }
    }
    // if no keyword was inserted then alert user to insert search keyword
    else{
        elSearchResult.innerHTML =  "<p>" + "Please insert valid keyword." + "</p>"
    }    
}

export{searchPage}