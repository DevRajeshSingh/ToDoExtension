const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".deleteAllBtn");
const delOne = document.querySelector(".delOne");
let today = new Date();
window.addEventListener("load", (event) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  today = dd + "/" + mm;
  document.getElementById("mainTitle").innerHTML = `${today}  TODO's` ;
  console.log(today);
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    myFunction();
    document.getElementById("switch").checked = true;
  }
});

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

delOne.addEventListener("click", () => {
  deleteTask(0);
});

inputBox.addEventListener("keyup", function (event) {
  if (event.keyCode == 13 && inputBox.value != "") {
    addBtn.click();
  }
});

showTasks();
addBtn.onclick = () => {
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove("active");
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length;
  if (listArray.length > 0) {
    deleteAllBtn.classList.add("active");
    delOne.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
    delOne.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><span class="bold">-</span></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = () => {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
};

function myFunction() {
  var element = document.getElementById("bodymode");
  element.classList.toggle("darkmode");
}
let sw = document.getElementById("switch");
sw.addEventListener("click", myFunction);

/*
let iconClass = document.getElementsByClassName("icon");
for (var i = 0; i < iconClass.length; i++) {
  iconClass[i].addEventListener("click", () => {
    listArray.forEach((element, index) => {
              if(element == iconClass[i].previousSibling.wholeText){
                  deleteTask(index);
              }
      console.log(element);
    });
  });
}
*/
