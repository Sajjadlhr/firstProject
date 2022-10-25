let addinputTxt = document.getElementById("taskinput");
let addTaskbtn = document.getElementById("addBtn");
let savebtn = document.getElementById("saveBtn");
let addUlTask = document.getElementById("orderId");
let addCompletelist = document.getElementById("completetask");

let addinputTxtVal = addinputTxt.value; 

// Api Endpoint

const apiEndPoint = "http://localhost:3000/posts";

addTaskbtn.addEventListener("click", async(e)=>{
    e.preventDefault();

          if(addinputTxtVal.trim() != 0){ 
  const newPost = {
    name: addinputTxtVal,
  }
    // Call Create Post Methods 
  const createdPost =  await createPost(newPost); 
  console.log("Post Mehtods", createdPost);
}
addinputTxt.value = "" 
getPosts();
  });

  // Create post methods

  const createPost = async(newpost)=>{
    try {
      const response = await fetch(apiEndPoint,{
        method: "POST",
        body: JSON.stringify(newpost),
        headers: { "Content-type": "application/json; charset=UTF-8 "}
       });
       if(response.status != 201){
        throw new Error(`Something went wrong, Status Code: ${response.status}`)
       }
       const post = await response.json();
    //    return post;
      
    } catch (error) {
      console.log(error)
    }
    
  };


  // get post
let getPosts = async (e)=>{
    try {
      const response = await fetch(apiEndPoint);
      if(!response.ok){
        throw Error(response.statusText);
      }
     const posts = await response.json();
    //  return posts;

     posts.forEach((element, index) => {
        addUlTask.innerHTML += `<li class="lineList" id="lineId">
        <input type="checkbox" class="check" onclick = "addComplete(${index})"/>
        <label
          class="task"
        >${element.name}</label>
        <div class="icon">
          <i class="fa fa-edit" onclick = "editTask(${index})"></i>
          <i class="fa fa-trash" onclick = "deleteTask(${index})"></i>
        </div>
      </li>`

    }); 
    } catch (error) {
      console.log(error);
    }
  }
// add task
  let addComplete = async(_index)=>{
    try {
      const response = await fetch(apiEndPoint);
      if(!response.ok){
        throw Error(response.statusText);
      }
     let posts = await response.json();
     console.log(posts)
    //  return posts;
    
     posts.forEach((element, index) => {
      if(index === _index){
      addCompletelist.innerHTML += `<li class="lineList" id="lineId">
        <input type="checkbox" class="check" onclick = "addComplete(${index})"/>
        <label
          class="task"
        >${element.name}</label>
        <div class="icon">
          <i class="fa fa-edit" onclick = "editTask(${index})"></i>
          <i class="fa fa-trash" onclick = "deleteTask(${index})"></i>
        </div>
      </li>`
      }
    }); 
    } catch (error) {
      console.log(error);
    }
  }

  function editTask(index){
    addinputTxt.value = index;
    addTaskbtn.style.display = "none"
    savebtn.style.display = "block" 
  }

  savebtn.addEventListener("click",(e)=>{
 
    addTaskbtn.style.display = "block"
    savebtn.style.display = "none"
    addinputTxt.value = ""  
    });
    
    let deleteTask = async(index)=>{
    
    }