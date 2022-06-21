var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentE1 = document.querySelector("#page-content");

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // check if input values are empty strings

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!")
    return false;
  }

  // package up data as an object

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  // send it as an argument to createTaskE1

  createTaskE1(taskDataObj);
  formEl.reset();
  };

var createTaskE1 = function(taskDataObj) {
     // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + 
taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsE1 = createTaskActions(taskIdCounter);

  listItemEl.appendChild(taskActionsE1);

  tasksToDoEl.appendChild(listItemEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // Increase task counter for next unique id
  taskIdCounter++;

};


 //create div container to hold new elements
 var createTaskActions = function(taskId){
   var actionContainerE1 = document.createElement("div");
   actionContainerE1.className = "task-actions";
   // create edit button
   var editButtonE1 = document.createElement("button");
   editButtonE1.textContent = "Edit";
   editButtonE1.className = "btn edit-btn";
   editButtonE1.setAttribute("data-task-id", taskId);
   actionContainerE1.appendChild(editButtonE1)
   // create delete button
   var deleteButtonE1 = document.createElement("button");
   deleteButtonE1.textContent = "delete";
   deleteButtonE1.className = "btn delete-btn";
   deleteButtonE1.setAttribute("dad-task-id", taskId);
   actionContainerE1.appendChild(deleteButtonE1);
   //dropdown
   var statusSelectE1 = document.createElement("select");
   statusSelectE1.className = "select-status";
   statusSelectE1.setAttribute("name", "status-change");
   statusSelectE1.setAttribute("data-task-id",taskId);

   actionContainerE1.appendChild(statusSelectE1);

   var statusChoices = ["To Do", "In Progress", "Completed"];

   for (var i = 0; i < statusChoices.length; i++);
    // create option element
    var statusOptionE1 = document.createElement("option");
    statusOptionE1.textContent = statusChoices[i];
    statusOptionE1.setAttribute("value", statusChoices[i]);

    // append to select

    statusSelectE1.appendChild(statusOptionE1);
    return actionContainerE1;
   }

var taskButtonHandler = function(event) {
  console.log(event.target);
};
pageContentE1.addEventListener("click", taskButtonHandler);
  
formEl.addEventListener("submit", taskFormHandler);