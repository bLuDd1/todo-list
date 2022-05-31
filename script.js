'use strict';

const addTask = document.getElementById('add-task');
const descriptionTask = document.getElementById('task');
const todosContainer = document.getElementsByClassName('todos-container');

const tasks = [];

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

// Adding new tasks to array
const addNewTask = () => {
  tasks.push(new Task(descriptionTask.value));
  updateStorage();
};

addTask.onclick = addNewTask;
