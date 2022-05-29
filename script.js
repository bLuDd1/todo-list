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

// Adding new tasks to array
addTask.addEventListener('click', () => {
  tasks.push(new Task(descriptionTask.value));
});
