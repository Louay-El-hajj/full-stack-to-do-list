document.addEventListener('DOMContentLoaded', function() {
    const tasksContainer = document.getElementById("tasks");
    const addTaskBtn = document.getElementById("add");
    const inputText = document.getElementById("task-input");
    const completedTasksColumn = document.getElementById("completedTasksColumn");

    let taskList = [];

    window.addEventListener('load', function() {
        fetchTasksFromDatabase();
    });

    addTaskBtn.addEventListener("click", addTask);
    inputText.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });

    function addTask() {
      if (inputText.value == "") {
        alert("Kindly Enter a Task Name!");
        return;
      }

      const newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.classList.add("draggable");
      newTask.draggable = true;
      taskList.push(newTask);

      // Construct the task element
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      newTask.appendChild(checkBox);
      const checkMark = document.createElement("span");
      checkMark.classList.add("checkmark");
      newTask.appendChild(checkMark);

      checkBox.addEventListener("change", function () {
        if (checkBox.checked == true) {
          textField.classList.add("completed");
          completeTask(this);
        } else {
          textField.classList.remove("completed");
        }
      });

      const priorityDropdown = document.getElementById("priorityDropdown");
      const selectedPriority = priorityDropdown.value;
      const priorityLabel = document.createElement("span");
      priorityLabel.classList.add("label", "priority", selectedPriority);
      priorityLabel.innerText =
        capitalizeFirstLetter(selectedPriority) + " Priority";
      newTask.appendChild(priorityLabel);

      const textField = document.createElement("input");
      textField.type = "text";
      textField.classList.add("task-text");
      textField.readOnly = true;
      textField.value = inputText.value;
      newTask.appendChild(textField);

      textField.addEventListener("blur", function () {
        if (textField.value == "") {
          newTask.remove();
        }
        textField.readOnly = true;
      });

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("action-btn");
      newTask.appendChild(btnDiv);

      const currentDateLabel = document.createElement("span");
      currentDateLabel.classList.add("label", "date");
      currentDateLabel.innerHTML =
        ' <i class="fas fa-flag"></i>' + getCurrentDate();
      btnDiv.appendChild(currentDateLabel);

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit");
      btnDiv.appendChild(editBtn);

      editBtn.addEventListener("click", function () {
        textField.readOnly = false;
        textField.focus();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      btnDiv.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", function () {
        const removedTask = taskList.indexOf(newTask);
        taskList.splice(removedTask, 1);
        newTask.remove();
      });

      sendTaskToDatabase(inputText.value)
        .then(data => {
        })
        .catch(error => {
          console.error('Error:', error);
        });

      tasksContainer.appendChild(newTask);
      inputText.value = "";
    }

    function sendTaskToDatabase(taskName) {
      return fetch('http://localhost/fullstack%20to%20do%20list/todolistdb/store_task.php', {
        method: 'POST',
        body: JSON.stringify({ taskName: taskName }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
    }

    function fetchTasksFromDatabase() {
      fetch('http://localhost/fullstack%20to%20do%20list/todolistdb/fetch_tasks.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        data.forEach(task => {
          const newTask = createTaskElement(task.id, task.name);
          tasksContainer.appendChild(newTask);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }


    function createTaskElement(taskId, taskName) {
      const newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.classList.add("draggable");
      newTask.draggable = true;
      taskList.push(newTask);

      
      return newTask;
    }

    function completeTask(button) {
      const task = button.parentElement;
      task.classList.add("completed");
      button.remove(); 
      completedTasksColumn.appendChild(task);
    }

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
