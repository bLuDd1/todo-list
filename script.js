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

let todoElems = [];

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
  `<div class="tasks-items ${task.completed ? 'checked' : ''}">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick="completeTask(${index})" 
                    class="btn-complete" type="checkbox" 
                    ${task.completed ? 'checked' : ''}>
                    <button onclick="deleteTask(${index})" 
                    class="btn-delete">Delete</button>
                </div>
            </div>`
  ;

const filterTasks = () => {
  const activeTasks = tasks.filter((item) => item.completed === false);
  const completedTasks = tasks.filter((item) => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
};

const fillTodosCont = () => {
  todosContainer.innerHTML = '';
  if (tasks.length !== 0) {
    filterTasks();
    for (const [index, item] of tasks.entries()) {
      todosContainer.innerHTML += createTemplate(item, index);
    }
    todoElems = document.querySelectorAll('.tasks-items');
  }
};

fillTodosCont();

const coupleFunctions = () => {
  updateStorage();
  fillTodosCont();
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoElems[index].classList.add('checked');
  } else {
    todoElems[index].classList.remove('checked');
  }
  coupleFunctions();
};

const deleteTask = (index) => {
  todoElems[index].classList.add('delition');
  setTimeout(() => {
    tasks.splice(index, 1);
    coupleFunctions();
  }, 500);
};

// Adding new tasks to array
addTask.onclick = () => {
  tasks.push(new Task(descriptionTask.value));
  coupleFunctions();
  descriptionTask.value = '';
};
