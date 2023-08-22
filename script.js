
const det = document.querySelector(".radioDiv > input");
const parentDiv = document.querySelector(".content > ul");
const addTodo = document.querySelector(".content > form");
const allLists = document.querySelector(".links .allItems");
const activeLists = document.querySelector(".links .ActiveItems");
const completedLists = document.querySelector(".links .completedItems");
const clearTodo = document.querySelector(".links .clearTodo");
const deleteAllList = document.querySelector(".content > form > i");

// const todoList = JSON.parse(localStorage.getItem("ToDo"));

// if (todoList) {
//   todoList.forEach((element) => {
//     createToDoList(element);
//     console.log(element);
//   });
// }

allLists.addEventListener("click", () => {
  allContent();
  allLists.classList.add("activeContent");
  activeLists.classList.remove("activeContent");
  completedLists.classList.remove("activeContent");
});

clearTodo.addEventListener("click", () => {
  console.log("clicked");
  clearTodoList();
  
});

activeLists.addEventListener("click", () => {
  activeContent();
  allLists.classList.remove("activeContent");
  activeLists.classList.add("activeContent");
  completedLists.classList.remove("activeContent");
});

completedLists.addEventListener("click", () => {
  completedContent();
  allLists.classList.remove("activeContent");
  activeLists.classList.remove("activeContent");
  completedLists.classList.add("activeContent");
});

let addToLocalStorage = [];


const clearTodoList = () => {
  addToLocalStorage = addToLocalStorage.filter((item) => {
    return item.isDone !== true;
  });
  parentDiv.innerHTML = "";
  addToLocalStorage.forEach((det) => {
    createToDoList(det);
  })
}

const allContent = () => {
  parentDiv.innerHTML = "";
  addToLocalStorage.forEach((ele) => {
    createToDoList(ele);
  });
  document.querySelector(".countLeft").innerHTML = getCount();
};

const activeContent = () => {
  const newData = addToLocalStorage.filter((det) => det.isDone === false);
  console.log(newData);
  parentDiv.innerHTML = "";
  let count=0;
  newData.forEach((element) => {
    createToDoList(element);
    count++;
  });
  document.querySelector(".countLeft").innerHTML = count;
};

const completedContent = () => {
  const newData = addToLocalStorage.filter((det) => det.isDone === true);
  console.log(newData);
  parentDiv.innerHTML = "";
  let count=0;
  newData.forEach((element) => {
    createToDoList(element);
    count++;
  });
  document.querySelector(".countLeft").innerHTML = count;
};

addTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  const { value } = e.target[0];
  const newData = {
    task: value,
    isDone: false,
  };
  e.target[0].value = "";
  createToDoList(newData);
  addToLocalStorage.push(newData);
});

const createToDoList = (text) => {

  let newList = document.createElement("li");

  newList.innerHTML = ` <div class="radioDiv">
                            <input value="${text.isDone}" type="checkbox">
                            <span class="ri-check-lin" ><i class="ri-check-line"></i></span>
                        </div>
                        <form class="listItemValue">
                          <input required value=${text.task} class="disable" type="text">
                          <p class="" id="createTodo" >${text.task}</p>
                          <button type="submit" class="disable" ></button>
                        </from>
                        <i class="ri-close-line"></i>`;

  const inputListItem = newList.querySelector(".listItemValue > input");
  const inputListItemForm = newList.querySelector("form");
  const editTodo = newList.querySelector(".listItemValue p");
  const deleteTodo = newList.querySelector(".ri-close-line");
  const completedTodo = newList.querySelector(".radioDiv > input");

  inputListItem.innerHTML = text.task;
  inputListItemForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const { value } = e.target[0];
    text.task = value;
    console.log(value);
    editTodo.innerHTML = marked(value);
    inputListItem.classList.toggle("disable");
    editTodo.classList.toggle("disable");
    // hideDiv.innerHTML = marked(value);
    // addToLocalStorage(value);
  });

  let token = 0;
  deleteAllList.addEventListener("click", function () {

    if (token === 0) {
      parentDiv.querySelectorAll("li").forEach((det) => {
        completedTodo.checked = true;
        text.isDone = true;
        editTodo.style.textDecoration = "line-through";
      });
      token = 1;
      clearTodo.classList.remove("disable");
    } else {
      completedTodo.checked = false;
      editTodo.style.textDecoration = "none";
      text.isDone = false
      token = 0;
      clearTodo.classList.add("disable");
    }



  });

  editTodo.addEventListener("dblclick", function (e) {
    inputListItem.innerHTML = text.task;
    inputListItem.classList.toggle("disable");
    editTodo.classList.toggle("disable");
  });
  if (text.isDone) {
    completedTodo.checked = true;
    editTodo.style.textDecoration = "line-through";
    clearTodo.classList.remove("disable");
  } else {
    completedTodo.checked = false;
    editTodo.style.textDecoration = "none";
    clearTodo.classList.add("disable");
  }

  completedTodo.addEventListener("click", function (e) {
    if (completedTodo.checked) {
      text.isDone = true;
      editTodo.style.textDecoration = "line-through";
      clearTodo.classList.remove("disable");
    } else {
      text.isDone = false;
      editTodo.style.textDecoration = "none";
      clearTodo.classList.add("disable");
    }
    console.log(addToLocalStorage);
  });

  deleteTodo.addEventListener("click", function () {
    newList.remove();
    addToLocalStorage = addToLocalStorage.filter((item) => {
      return item.task !== text.task;
    });
    document.querySelector(".countLeft").innerHTML = getCount();
  });

  parentDiv.appendChild(newList);
  console.log(addToLocalStorage);
  document.querySelector(".countLeft").innerHTML = getCount();
};

function getCount(){
  return document.querySelectorAll("li").length;
}


// function addToLocalStorage() {
//   const todos = document.querySelectorAll("li #createTodo");
//   localStorage.setItem('todos',JSON.stringify([...todos]))

// todos.forEach((det) => {
//   todoList.push({
//     task:det.value,
//     isDone:false,
//   });
// });
//   localStorage.setItem("TodoList", JSON.stringify(todoList));
// }
