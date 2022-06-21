'use strict';

const addTask = document.getElementById('add-task');
const descriptionTask = document.getElementById('task');
const todosContainer = document.querySelector('.todos-container');
const currentDate = document.querySelector('.current-date');
const currentDay = document.querySelector('.current-day');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const backgroundButton = document.getElementById('button-background');

let tasks;
if (!localStorage.tasks) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

let todoElems = [];

// Creating new tasks
class Task {
  constructor(description, date, time) {
    this.description = description;
    this.completed = false;
    this.date = date;
    this.time = time;
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
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoElems[index].classList.add('checked');
  } else {
    todoElems[index].classList.remove('checked');
  }
  updateStorage();
  fillTodosCont();
};

const deleteTask = (index) => {
  todoElems[index].classList.add('delition');
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

// Adding new tasks to array
addTask.onclick = () => {
  tasks.push(new Task(descriptionTask.value, dateInput.value, timeInput.value));
  updateStorage();
  fillTodosCont();
  resetInputs();
};

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
  const year = zeroFormat(currentDate.getFullYear());
  return day + '.' + month + '.' + year;
};

currentDate.innerHTML = getCurrentDate();

const getCurrentDay = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const date = new Date();
  const currentDay = date.getDay();
  return days[currentDay];
};

currentDay.innerHTML = getCurrentDay();

const colors = [
  '#E7C950',
  '#D4AC0D',
  '#884EA0',
  '#7F8C8D',
  '#AF601A',
  '#5499C7'
];

const getRandomNumber = (value) => Math.floor(Math.random() * value);

backgroundButton.onclick = () => {
  document.body.style.backgroundColor = colors[getRandomNumber(colors.length)];
};
