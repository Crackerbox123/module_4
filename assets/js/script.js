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

  // task info

  var isEdit = formEl.hasAttribute("data-task-id");

  // package up data as an object

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  // edit main body
  var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list here
    var taskSelected = document.querySelector(".task.item[data-task-id='" + taskId + "']");
  
    // set new values
    //taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
  
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function

  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    createTaskE1(taskDataObj);
   
  }
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
   deleteButtonE1.setAttribute("data-task-id", taskId);
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
  // get target element from event
  var targetE1 = event.target;

  // edit button was clicked
  
  if (targetE1.matches(".edit-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
    editTask(taskId);
  }

  // delete button was clicked

  if (targetE1.matches(".delete-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var editTask = function(taskId) {

  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type

  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);


};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}





pageContentE1.addEventListener("click", taskButtonHandler);
  
formEl.addEventListener("submit", taskFormHandler);