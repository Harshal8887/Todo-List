//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");


// Event listner
document.addEventListener('DOMContentLoded', getTodos());
if(todoButton){
todoButton.addEventListener("click", addTodo);}
if(todoList){
todoList.addEventListener("click", deletecheck);}
filterOption.addEventListener('click', filterTodo);

//function
function addTodo(event){
    // from
   event.preventDefault();
   // console.log('hello');
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    //buttons check mark
    const completeButton = document.createElement('button');
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
      //buttons Trash
      const trashButton = document.createElement('button');
      trashButton.innerHTML = "<i class='fas fa-trash'></i>";
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);
      //appent to listr
      todoList.appendChild(todoDiv);
      //clear todo input value
      todoInput.value="";
  
}
function deletecheck(e){
   const item = e.target;
   if(item.classList[0] === 'trash-btn'){
       const todo = item.parentElement;
       todo.classList.add("fall");
       removeLocalTodos(todo);
       todo.addEventListener('transitioned', function(){
       todo.remove();
        });
     
   }
   if(item.classList[0] === 'complete-btn'){
      const todo = item.parentElement; 
     todo.classList.toggle("completed");
  }

}

function filterTodo(e){
   const todos =todoList.childNodes;
   todos.forEach(function(todo){
      switch(e.target.value){
         case "all":
            todo.style.display = "flex";
            break;
         case "completed":
         if (todo.classList.contains('completed')){
            todo.style.display = "flex";
         }   else {
            todo.style.display = "none";
         }
         break;
         case "uncompleted":
            if (!todo.classList.contains('completed')){
               todo.style.display = "flex";
            }   else {
               todo.style.display = "none";
            }
            break;
      }
   });
}

function saveLocalTodos(todo){
   //check existing
   let todos;
   if(localStorage.getItem('todos') === null){
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
   //console.log("hello");
   let todos;
   if(localStorage.getItem('todos') === null){
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
todos.forEach(function(todo){


   const todoDiv =document.createElement("div");
   todoDiv.classList.add("todo");
   const newTodo = document.createElement('li');
   newTodo.innerText = todo;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
 
   //buttons check mark
   const completeButton = document.createElement('button');
   completeButton.innerHTML = "<i class='fas fa-check'></i>";
   completeButton.classList.add('complete-btn');
   todoDiv.appendChild(completeButton);
     //buttons Trash
     const trashButton = document.createElement('button');
     trashButton.innerHTML = "<i class='fas fa-trash'></i>";
     trashButton.classList.add('trash-btn');
     todoDiv.appendChild(trashButton);
     //appent to listr
     todoList.appendChild(todoDiv);
});
   
}
function removeLocalTodos(todo){
   console.log("fefrdsfsf");
   let todos;
   if(localStorage.getItem('todos') === null){
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos)); 
}

