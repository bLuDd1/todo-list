'use strict';

const addTask = document.getElementById('add-task');
const descriptionTask = document.getElementById('task');
const todosContainer = document.querySelector('.todos-container');
const currentDate = document.querySelector('.current-date');
const currentDay = document.querySelector('.current-day');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const backgroundButton = document.getElementById('button-background');
const selectCategory = document.getElementById('select');
const deleteAll = document.getElementById('delete-all');

let tasks;

const checkTasks = () => {
  if (!localStorage.tasks) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
};

checkTasks();

let todoElems = [];

// Creating new tasks
class Task {
  constructor(description, date, time, category) {
    this.description = description;
    this.completed = false;
    this.date = date;
    this.time = time;
    this.category = category;
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
                <div id="date-output">${task.date}</div>
                <div id="time-output">${task.time}</div>
                <div id="chosen-category">${task.category}</div>
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

const completeTask = (index) => {
  const task = tasks[index];
  const todoElem = todoElems[index];
  task.completed = !task.completed;
  if (task.completed) {
    todoElem.classList.add('checked');
  } else {
    todoElem.classList.remove('checked');
  }
  updateStorage();
  fillTodosCont();
};

const deleteTask = (index) => {
  todoElems[index].classList.add('deletion');
  setTimeout(() => {
    tasks.splice(index, 1);
    updateStorage();
    fillTodosCont();
  }, 500);
};

const resetInputs = () => {
  const inputs = document.querySelectorAll('.task-input');
  for (const input of inputs) {
    input.value = '';
  }
};

const alerts = [
  'Enter your task!',
  'Enter correct date!',
  'Enter correct time!',
  'Choose category!'
];

const validation = (...args) => {
  for (let i = 0; i < alerts.length; i++) {
    if (!args[i] || args[i] instanceof Date) {
      alert(alerts[i]);
      return false;
    }
  }
  return true;
};

// Adding new tasks to array
addTask.onclick = () => {
  if (validation(descriptionTask.value,
    dateInput.value,
    timeInput.value,
    selectCategory.value))
    tasks.push(new Task(
      descriptionTask.value,
      dateInput.value,
      timeInput.value,
      selectCategory.value)
    );
  updateStorage();
  fillTodosCont();
  resetInputs();
};

// Needs to show the correct date
const zeroFormat = (value) => {
  if (value < 10) { // Dates and months that starts with '0'
    value = '0' + value;
  }
  return value;
};

// Shows current date
const getCurrentDate = () => {
  const currentDate = new Date();
  const day = zeroFormat(currentDate.getDate());
  const month = zeroFormat(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();
  return day + '.' + month + '.' + year;
};

currentDate.innerHTML = getCurrentDate();

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const getCurrentDay = () => {
  const date = new Date();
  const currentDay = date.getDay();
  return days[currentDay];
};

currentDay.innerHTML = getCurrentDay();

const getRandomNumber = (value) => Math.round(Math.random() * value);

// Change background color

const colors = [
  '#E7C950',
  '#930D1F',
  '#884EA0',
  '#7F8C8D',
  '#0E760E',
  '#5499C7'
];

backgroundButton.onclick = () => {
  document.body.style.backgroundColor = colors[getRandomNumber(colors.length)];
};

const deleteAllTasks = (index) => {
  todosContainer.classList.add('deletion');
  setTimeout(() => {
    tasks.splice(index, tasks.length);
    updateStorage();
    fillTodosCont();
    todosContainer.innerHTML = '';
  }, 500);
};

deleteAll.onclick = deleteAllTasks;

