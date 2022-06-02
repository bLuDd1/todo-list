'use strict';

const addTask = document.getElementById('add-task');
const descriptionTask = document.getElementById('task');
const todosContainer = document.getElementsByClassName('todos-container');

let tasks;
if (!localStorage.tasks) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

// Creating new tasks
class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }
}

const updateStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Shows tasks at page screen
const createTemplate = task =>
  `<div class="tasks-items">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input class="btn-complete" type="checkbox">
                    <button class="btn-delete">Delete</button>
                </div>
            </div>`
  ;

const fillTodosCont = () => {
  todosContainer.innerHTML = '';
  if (tasks.length > 0) {
    for (const key of tasks) {
      todosContainer.innerHTML = createTemplate(key);
    }
  }
};

// Adding new tasks to array
const addNewTask = () => {
  tasks.push(new Task(descriptionTask.value));
  updateStorage();
  fillTodosCont();
};

addTask.onclick = addNewTask;
