'use strict';

const addTask = document.getElementById('add-task');
const descriptionTask = document.getElementById('task');
const todosContainer = document.querySelector('.todos-container');

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
const createTemplate = (task, index) =>
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
    tasks.map((item, index) => {
      todosContainer.innerHTML += createTemplate(item, index);
    });
  }
};
// Adding new tasks to array

addTask.onclick = () => {
  tasks.push(new Task(descriptionTask.value));
  updateStorage();
  fillTodosCont();
};
